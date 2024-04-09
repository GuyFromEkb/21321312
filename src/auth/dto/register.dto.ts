import { ApiProperty, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

import { UserEntity } from "~user/entities/user.entity";

export class RegisterDto extends PickType(UserEntity, ["email", "username", "password"]) {
  @ApiProperty({ example: "BobWalter" })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase())
  readonly username: string;

  @ApiProperty({ example: "herberSpenser@yahoo.com" })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({ example: "dsaDS123!" })
  @IsNotEmpty()
  readonly password: string;
}
