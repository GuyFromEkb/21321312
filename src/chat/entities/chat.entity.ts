import { Entity, Property } from "@mikro-orm/core";

import { PrimaryGeneratedGuid } from "~common/decorator";

@Entity({ tableName: "chats" })
export class ChatEntity {
  @PrimaryGeneratedGuid()
  id: string;

  @Property()
  title!: string;
}
