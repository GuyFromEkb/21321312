import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserSessionEntity } from "~auth/entities/user-session.entity";

import { TokenService } from "./token.service";

@Module({
  imports: [JwtModule.register({}), MikroOrmModule.forFeature([UserSessionEntity])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
