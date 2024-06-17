import type { Insertable, Kysely } from 'kysely';
import { type Messages } from '@/database';
import type { DB } from '@/database/types';

type NewMessage = Omit<Messages, 'id' | 'createdAt'>;

export function findAllMessages(db: Kysely<DB>) {
  return db.selectFrom('messages').selectAll().execute();
}

export async function findMessagesByUserName(db: Kysely<DB>, userName: string) {
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

export async function findMessagesBySprintCode(
  db: Kysely<DB>,
  sprintCode: string
) {
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

export function create(db: Kysely<DB>, message: Insertable<NewMessage>) {
  return db
    .insertInto('messages')
    .values(message)
    .returningAll()
    .executeTakeFirst();
}
