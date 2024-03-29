import { PartialType, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

import { UserEntity } from "../entities/user.entity";

export class UpdateUserDto extends PickType(PartialType(UserEntity), ["email", "bio", "username"]) {
  @IsOptional()
  @IsString()
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
