import { ApiProperty, PickType } from "@nestjs/swagger";

import { UserEntity, UserRole } from "../entities/user.entity";

export class UserResponse extends PickType(UserEntity, [
  "email",
  "username",
  "password",
  "bio",
  "id",
  "role",
]) {
  email: string;
  password: string;
  username: string;
  bio?: string;
  id: string;

  @ApiProperty({ enum: Object.values(UserRole) })
  role: UserRole;
}
