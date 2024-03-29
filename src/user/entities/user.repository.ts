import { EntityName, EntityRepository, SqlEntityManager } from "@mikro-orm/postgresql";

// Import EntityManager from your driver package or `@mikro-orm/knex`
import type { UserEntity } from "./user.entity";

export class UserRepository extends EntityRepository<UserEntity> {
  constructor(em: SqlEntityManager, entityName: EntityName<UserEntity>) {
    super(em, entityName);
  }

  removeUser(user: UserEntity) {
    return this.em.removeAndFlush(user);
  }
}
