import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { UserResponse } from "~user/response/user.response";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  @UsePipes()
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterDto): Promise<UserResponse> {
    const user = await this.authService.register(registerDto);

    return new UserResponse(user);
  }

  @Post("login")
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginDto: LoginDto): Promise<UserResponse> {
    const user = await this.authService.login(loginDto);

    return new UserResponse(user);
  }
}
