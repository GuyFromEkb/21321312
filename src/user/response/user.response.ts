import { Collection } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Exclude } from "class-transformer";

import { UserSessionEntity } from "~auth/entities/user-session.entity";
import { UserEntity, UserRole } from "~user/entities/user.entity";

@Injectable()
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

  @Exclude()
  session?: Collection<UserSessionEntity>;

  constructor(userEntity: Partial<UserEntity>) {
    Object.assign(this, userEntity);
  }
}
