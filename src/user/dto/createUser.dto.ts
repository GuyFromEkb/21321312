import { PickType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

import { UserEntity } from "../entities/user.entity";

export class CreateUserDto extends PickType(UserEntity, ["email", "username", "password"]) {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase())
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
