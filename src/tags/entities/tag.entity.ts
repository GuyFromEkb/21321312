import {
  Entity,
  // EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

// import { TagRepository } from './tags.repository';

@Entity({ tableName: 'tags' })
export class TagEntity {
  // [EntityRepositoryType]?: TagRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  optionalProperty?: string;
}
