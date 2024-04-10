import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "~common/guard";

import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserResponse } from "./response/user.response";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<UserResponse[]> {
    const user = await this.userService.findAll();

    return user.map((user) => new UserResponse(user));
  }

  @ApiOperation({ summary: "Получение пользователя по id" })
  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<UserResponse> {
    const user = await this.userService.findOneById(id);

    return new UserResponse(user);
  }

  @ApiOperation({ summary: "Изменение пользователя по id" })
  @Patch(":id")
  @UsePipes()
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.update(id, updateUserDto);

    return new UserResponse(user);
  }

  @ApiOperation({ summary: "Удаление пользователя по id" })
  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    const userId = await this.userService.remove(id);

    return JSON.stringify(userId);
  }
}
