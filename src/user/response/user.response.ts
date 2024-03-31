import { Exclude } from "class-transformer";

import { UserEntity, UserRole } from "~user/entities/user.entity";

export class UserResponse implements Partial<UserEntity> {
  email: string;

  @Exclude()
  password: string;

  username: string;

  bio: string;

  id: string;

  role: UserRole;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(userEntity: Partial<UserEntity>) {
    Object.assign(this, userEntity);
  }
}
