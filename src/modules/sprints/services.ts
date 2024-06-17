import type { Insertable, Kysely, Updateable } from 'kysely';
import { type Sprints } from '../../database';
import type { DB } from '@/database/types';

type SprintWithoutId = Omit<Sprints, 'id'>;

export function findAllSprints(db: Kysely<DB>) {
  return db.selectFrom('sprints').selectAll().execute();
}

export function findSprintByCode(db: Kysely<DB>, sprintCode: string) {
  return db
    .selectFrom('sprints')
    .selectAll()
    .where('code', '=', sprintCode)
    .executeTakeFirstOrThrow();
}

export function findSprintByTitle(db: Kysely<DB>, sprintTitle: string) {
  return db
    .selectFrom('sprints')
    .selectAll()
    .where('title', '=', sprintTitle)
    .executeTakeFirstOrThrow();
}

export function findSprintById(db: Kysely<DB>, id: number) {
  return db
    .selectFrom('sprints')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export function createSprint(
  db: Kysely<DB>,
  sprintDetails: Insertable<SprintWithoutId>
) {
  return db
    .insertInto('sprints')
    .values(sprintDetails)
    .returningAll()
    .executeTakeFirst();
}

export function update(
  db: Kysely<DB>,
  id: number,
  details: Updateable<SprintWithoutId>
) {
  return db
    .updateTable('sprints')
    .set(details)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export function remove(db: Kysely<DB>, id: number) {
  return db.deleteFrom('sprints').where('id', '=', id).returningAll().execute();
}
