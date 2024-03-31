import { BeforeCreate, Entity, EntityRepositoryType, Enum, Opt, Property } from "@mikro-orm/core";

import { PrimaryGeneratedGuid } from "~common/decorator/PrimaryGeneratedGuid";
import { envConfigService } from "~common/provider/envConfigServiceProvider";
import { hashUserPassword } from "~common/util/hashUserPassword";

import { UserRepository } from "./user.repository";

export enum UserRole {
  Admin = "ADMIN",
  Moderator = "MODERATOR",
  User = "USER",
}
@Entity({ tableName: "users", repository: () => UserRepository })
export class UserEntity {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryGeneratedGuid()
  id: string;

  @Property({ unique: true })
  username!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Enum(() => UserRole)
  role: UserRole & Opt = UserRole.User;

  @Property({ default: null, nullable: true })
  bio?: string | null;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();

  @BeforeCreate()
  private async hashPassword() {
    this.password = await hashUserPassword(this.password, +envConfigService.env.USER_PASSWORD_SALT_ROUNDS);
  }
}
