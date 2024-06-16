import type { Insertable, Updateable } from 'kysely';
import db, { type Sprints } from '@/database';

type SprintWithoutId = Omit<Sprints, 'id'>;

export function findAllSprints() {
  return db.selectFrom('sprints').selectAll().execute();
}

export function findSprintByCode(sprintCode: string) {
  return db
    .selectFrom('sprints')
    .selectAll()
    .where('code', '=', sprintCode)
    .executeTakeFirstOrThrow();
}

export function findSprintByTitle(sprintTitle: string) {
  return db
    .selectFrom('sprints')
    .selectAll()
    .where('title', '=', sprintTitle)
    .executeTakeFirstOrThrow();
}

export function findSprintById(id: number) {
  return db
    .selectFrom('sprints')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export function createSprint(sprintDetails: Insertable<SprintWithoutId>) {
  return db
    .insertInto('sprints')
    .values(sprintDetails)
    .returningAll()
    .executeTakeFirst();
}

export function update(id: number, details: Updateable<SprintWithoutId>) {
  return db
    .updateTable('sprints')
    .set(details)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export function remove(id: number) {
  return db.deleteFrom('sprints').where('id', '=', id).returningAll().execute();
}
