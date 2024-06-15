import type { Insertable } from 'kysely';
import db, { type Messages } from '@/database';

// type NewMessage = Omit<Messages, "id" | "gifUrl" | "message" | "createdAt">

export function findAllMessages() {
  return db.selectFrom('messages').selectAll().execute();
}

export function findMessagesByUserId(userName: string) {
  return db
    .selectFrom('messages')
    .selectAll()
    .where('username', '=', userName)
    .execute();
}

export function findMessagesBySprintCode(sprintCode: string) {
  return db
    .selectFrom('messages')
    .selectAll()
    .where('sprintCode', '=', sprintCode)
    .execute();
}

export function create(message) {
  return db
    .insertInto('messages')
    .values(message)
    .returningAll()
    .executeTakeFirst();
}
