import { Entity, OneToOne } from "@mikro-orm/core";

import { UserEntity } from "~user/entities/user.entity";

import { ChatEntity } from "./chat.entity";

@Entity({ tableName: "user_chats" })
export class UserChatEntity {
  //хз как это будет работать\ нужно смотреть
  @OneToOne(() => ChatEntity, { primary: true })
  chat: ChatEntity;

  @OneToOne(() => UserEntity)
  user: UserEntity;

  //Todo в теории нужно сюда наверное добавить?
  //   @Property()
  //   lastMessage!: string;
}
