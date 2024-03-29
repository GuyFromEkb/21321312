import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes } from "@nestjs/common";

import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @UsePipes()
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    const userId = await this.userService.remove(id);

    return JSON.stringify(userId);
  }
}
