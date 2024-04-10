import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { EnvConfigService } from "~common/module/envConfigModule";
import { ITokenUserData } from "~common/module/tokenModule/token.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(envConfigService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any): Promise<ITokenUserData> {
    return {
      email: payload.email,
      id: payload.id,
      role: payload.role,
      username: payload.username,
    };
  }
}
