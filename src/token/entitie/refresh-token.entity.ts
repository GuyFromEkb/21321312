import { Entity } from "@mikro-orm/core";

import { PrimaryGeneratedGuid } from "~common/decorator/PrimaryGeneratedGuid";

@Entity({ tableName: "refresh-tokens" })
export class refreshTokenEntity {
  @PrimaryGeneratedGuid()
  token: string;
}
