import { ApiProperty, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

import { UserEntity } from "~user/entities/user.entity";

export class LoginDto extends PickType(UserEntity, ["email", "password"]) {
  @ApiProperty({ example: "herberSpenser@yahoo.com" })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({ example: "dsaDS123!" })
  @IsNotEmpty()
  readonly password: string;
}
