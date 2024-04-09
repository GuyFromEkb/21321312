import { Injectable } from "@nestjs/common";

import { UserEntity } from "~user/entities/user.entity";
import { UserResponse } from "~user/response/user.response";

@Injectable()
export class LoginResponse {
  user: UserResponse;
  /** accessToken @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHlhLnJ1IiwiaWQiOiJiMzcwNWVjMi01MWYwLTRiYWEtYTRjYi1iMWZiYTZlY2NhMTQiLCJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3MTI2NzI5OTUsImV4cCI6MTcxMjY3MzI5NX0.kKbzAN2e4JDGKXtozLjcBWrzZNGi0djDVb5R5qeLCl0 */
  accessToken: string;

  constructor(config: { user: Partial<UserEntity>; accessToken: string }) {
    Object.assign(this, config);
  }
}
