import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
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

  async createAccessToken(data: ITokenUserData): Promise<string> {
    const accessToken = await this.jwtService.signAsync(data, {
      secret: this.envConfigService.env.JWT_ACCESS_SECRET,
      expiresIn: "5m",
    });

    return accessToken;
  }

  async createRefreshToken(data: ITokenUserData): Promise<{
    refreshToken: string;
    expTimeStamp: number;
  }> {
    const refreshToken = await this.jwtService.signAsync(data, {
      secret: this.envConfigService.env.JWT_REFRESH_SECRET,
      expiresIn: "30m",
    });

    const expTimeStamp = this.jwtService.decode(refreshToken).exp as number;

    return { refreshToken, expTimeStamp };
  }

  async isTokenValid(...tokenConfig: { token: string; type: "Access" | "Refresh" }[]) {
    const result = tokenConfig.map((token) => {
      return this.jwtService.verifyAsync(token.token, {
        secret:
          token.type === "Access"
            ? this.envConfigService.env.JWT_ACCESS_SECRET
            : this.envConfigService.env.JWT_REFRESH_SECRET,
      });
    });

    const a = await Promise.all(result);
    console.log("a", a);
    return a;
  }

  async setRefreshTokenToDB(token: string, user: UserEntity, userAgent: string) {
    const hashToken = hashRefreshToken(token);
    const session = new UserSessionEntity(hashToken, userAgent, user);

    this.userSessionRepo.create(session);
    await this.em.flush();
  }

  async setOrUpdateRefreshTokenToDB(token: string, user: UserEntity, userAgent: string) {
    const existSession = await this.userSessionRepo.findOne({
      user,
      userAgent,
    });

    const hashToken = hashRefreshToken(token);

    if (existSession) {
      existSession.token = hashToken;
    } else {
      const session = new UserSessionEntity(hashToken, userAgent, user);
      this.userSessionRepo.create(session);
    }

    await this.em.flush();
  }
}
