import type { Insertable } from 'kysely';
import db, { type Messages } from '@/database';

type NewMessage = Omit<Messages, 'id' | 'createdAt'>;

export function findAllMessages() {
  return db.selectFrom('messages').selectAll().execute();
}

export async function findMessagesByUserName(userName: string) {
  const messages = await db
    .selectFrom('messages')
    .selectAll()
    .where('username', '=', userName)
    .execute();

  if (!messages || messages.length === 0) {
    throw new Error('User not found');
  }

  return messages;
}

export async function findMessagesBySprintCode(sprintCode: string) {
  const messages = await db
    .selectFrom('messages')
    .selectAll()
    .where('sprintCode', '=', sprintCode)
    .execute();

  if (!messages || messages.length === 0) {
    throw new Error('Sprint code not found');
  }

  return messages;
}

export function create(message: Insertable<NewMessage>) {
  return db
    .insertInto('messages')
    .values(message)
    .returningAll()
    .executeTakeFirst();
}
