import { PrimaryKey, PrimaryKeyOptions } from "@mikro-orm/core";

export const PrimaryGeneratedGuid = <T extends object>(options: PrimaryKeyOptions<T> = {}) => {
  return PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()", ...options });
};
