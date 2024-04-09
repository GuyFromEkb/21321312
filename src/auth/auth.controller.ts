import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { LoginResponse } from "~auth/response/login.response";
import { TokenService } from "~common/module/tokenModule";
import { ITokenUserData } from "~common/module/tokenModule/token.interface";
import { UserResponse } from "~user/response/user.response";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  @UsePipes()
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterDto): Promise<UserResponse> {
    const user = await this.authService.register(registerDto);

    return new UserResponse(user);
  }

  @ApiOperation({ summary: "Логин пользователя" })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
    //@ts-ignore(ReturnType): res.cookie().status().json()
  ): Promise<LoginResponse> {
    const user = await this.authService.login(loginDto);

    const tokenData: ITokenUserData = {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
    };

    const [refreshTokenData, accessToken] = await Promise.all([
      this.tokenService.createRefreshToken(tokenData),
      this.tokenService.createAccessToken(tokenData),
    ]);

    await this.tokenService.setOrUpdateRefreshTokenToDB(
      refreshTokenData.refreshToken,
      user,
      req.headers["user-agent"],
    );

    const response = instanceToPlain(
      new LoginResponse({ user: new UserResponse(user), accessToken: accessToken }),
    );

    res
      .cookie("RefreshToken", refreshTokenData.refreshToken, {
        secure: true,
        maxAge: refreshTokenData.expTimeStamp,
        httpOnly: false,
        path: "/",
      })
      .status(HttpStatus.OK)
      .json(response);
  }
}
