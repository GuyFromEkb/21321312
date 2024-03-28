import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

import { getUtcDateTime } from "~common/util/getUtcDateTime";

@Entity({ tableName: "users" })
export class UserEntity {
  @PrimaryKey({ type: "uuid" })
  id: string;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ default: null, nullable: true })
  bio?: string;

  @Property()
  createdAt = getUtcDateTime();

  @Property({ onUpdate: () => getUtcDateTime() })
  updatedAt = getUtcDateTime();

  // @BeforeUpdate()
  // @BeforeCreate()
  // private async hashPassword() {
  //   this.password = await hash(this.password, USER_PASSWORD_SALT);
  // }
}
