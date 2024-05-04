import { Entity, ManyToOne, Opt, Property } from "@mikro-orm/core";

import { PrimaryGeneratedGuid } from "~common/decorator";
import { UserEntity } from "~user/entities/user.entity";

import { ChatEntity } from "./chat.entity";

@Entity({ tableName: "messages" })
export class MessageEntity {
  @PrimaryGeneratedGuid()
  id: string;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @ManyToOne(() => ChatEntity)
  chat!: ChatEntity;

  @Property()
  text!: string;

  @Property()
  createdAt: Date & Opt = new Date();
}
