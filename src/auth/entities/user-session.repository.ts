import { EntityName, EntityRepository, SqlEntityManager } from "@mikro-orm/postgresql";

import type { UserSessionEntity } from "./user-session.entity";

export class UserSessionRepository extends EntityRepository<UserSessionEntity> {
  constructor(em: SqlEntityManager, entityName: EntityName<UserSessionEntity>) {
    super(em, entityName);
  }
}
