import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserSessionEntity } from "~auth/entities/user-session.entity";
import { UserSessionRepository } from "~auth/entities/user-session.repository";
import { EnvConfigService } from "~common/module/envConfigModule";
import { ITokenUserData } from "~common/module/tokenModule/token.interface";
import { hashRefreshToken } from "~common/util/hashRefreshToken";
import { UserEntity } from "~user/entities/user.entity";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envConfigService: EnvConfigService,
    private readonly userSessionRepo: UserSessionRepository,
    private readonly em: EntityManager,
  ) {}

  async setUserSessionAfterLogin(user: UserEntity, userAgent: string) {
    const tokenData: ITokenUserData = {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
    };

    const { accessToken, refreshTokenData } = await this.createRefreshAndAccessToken(tokenData);

    const existSession = await this.userSessionRepo.findOne({
      user,
      userAgent,
    });

    const hashToken = hashRefreshToken(refreshTokenData.refreshToken);

    if (existSession) {
      existSession.token = hashToken;
    } else {
      const session = new UserSessionEntity(hashToken, userAgent, user);
      this.userSessionRepo.create(session);
    }

    await this.em.flush();

    return { accessToken, refreshTokenData };
  }

  async setUserSessionAfterUpdateToken(userAgent: string, refreshToken?: string) {
    const isTokenVerify = await this.isTokenVerify({ token: refreshToken, type: "Refresh" });
    if (!isTokenVerify) throw new UnauthorizedException();

    const hashExistToken = hashRefreshToken(refreshToken);

    const existSession = await this.userSessionRepo.findOne(
      { token: hashExistToken, userAgent },
      { populate: ["user"] },
    );

    if (!existSession) throw new UnauthorizedException();

    const tokenData: ITokenUserData = {
      email: existSession.user.email,
      id: existSession.user.id,
      role: existSession.user.role,
      username: existSession.user.username,
    };

    const { accessToken, refreshTokenData } = await this.createRefreshAndAccessToken(tokenData);

    existSession.token = hashRefreshToken(refreshTokenData.refreshToken);
    await this.em.flush();

    return { accessToken, refreshTokenData };
  }

  private async createRefreshAndAccessToken(tokenData: ITokenUserData) {
    const [refreshTokenData, accessToken] = await Promise.all([
      this.createRefreshToken(tokenData),
      this.createAccessToken(tokenData),
    ]);

    return { refreshTokenData, accessToken };
  }

  private async createAccessToken(data: ITokenUserData): Promise<string> {
    const accessToken = await this.jwtService.signAsync(data, {
      secret: this.envConfigService.env.JWT_ACCESS_SECRET,
      expiresIn: this.envConfigService.env.JWT_ACCESS_EXPIRES_IN,
    });

    return accessToken;
  }

  private async createRefreshToken(data: ITokenUserData): Promise<{
    refreshToken: string;
    expTimeStamp: number;
  }> {
    const refreshToken = await this.jwtService.signAsync(data, {
      secret: this.envConfigService.env.JWT_REFRESH_SECRET,
      expiresIn: this.envConfigService.env.JWT_REFRESH_EXPIRES_IN,
    });

    const expTimeStamp = this.jwtService.decode(refreshToken).exp as number;
    return { refreshToken, expTimeStamp };
  }

  private async isTokenVerify(...tokenConfig: { token?: string; type: "Access" | "Refresh" }[]) {
    try {
      const result = tokenConfig.map((token) => {
        return this.jwtService.verifyAsync(token.token, {
          secret:
            token.type === "Access"
              ? this.envConfigService.env.JWT_ACCESS_SECRET
              : this.envConfigService.env.JWT_REFRESH_SECRET,
        });
      });

      const isTokenVerify = Boolean(await Promise.all(result));

      return isTokenVerify;
    } catch {
      return false;
    }
  }
}
