import { Collection } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

import { UserSessionEntity } from "~auth/entities/user-session.entity";
import { UserEntity, UserRole } from "~user/entities/user.entity";

@Injectable()
export class UserResponse implements Partial<UserEntity> {
  /** user email @example herberSpenser@yahoo.com */
  email: string;

  /** user name @example 'Bob Walter' */
  username: string;

  /** user short information @example 'I like turtle' */
  bio?: string;

  /** user GUID @example b3705ec2-51f0-4baa-a4cb-b1fba6ecca14*/
  id: string;

  /** user role @example USER */
  role: UserRole;

  @ApiHideProperty()
  @Exclude()
  createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  session?: Collection<UserSessionEntity>;

  @ApiHideProperty()
  @Exclude()
  password: string;

  constructor(userEntity: Partial<UserEntity>) {
    Object.assign(this, userEntity);
  }
}
