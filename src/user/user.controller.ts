import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import type { UserResponse } from "./response/user.response";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.userService.create(createUserDto);
  }
  @ApiOperation({ summary: "Получение всех пользователей" })
  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "Получение пользователя по id" })
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<UserResponse> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: "Изменение пользователя по id" })
  @Patch(":id")
  @UsePipes()
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.userService.update(id, updateUserDto);
  }
  @ApiOperation({ summary: "Удаление пользователя по id" })
  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    const userId = await this.userService.remove(id);

    return JSON.stringify(userId);
  }
}
