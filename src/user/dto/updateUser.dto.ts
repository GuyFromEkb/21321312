import { PartialType, PickType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

import { UserEntity } from "../entities/user.entity";

export class UpdateUserDto extends PickType(PartialType(UserEntity), ["email", "bio", "username"]) {
  @IsOptional()
  @IsString()
  @IsEmail()
  bio?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase())
  username?: string;
}
