import { Entity, EntityRepositoryType, ManyToOne, Property } from "@mikro-orm/core";

import { UserEntity } from "~user/entities/user.entity";

import { UserSessionRepository } from "./user-session.repository";

@Entity({ tableName: "user_sessions", repository: () => UserSessionRepository })
export class UserSessionEntity {
  [EntityRepositoryType]?: UserSessionRepository;

  @Property({ unique: true, primary: true })
  token: string;

  @Property()
  userAgent!: string;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  constructor(token: string, userAgent: string, user: UserEntity) {
    this.token = token;
    this.userAgent = userAgent;
    this.user = user;
  }
}
