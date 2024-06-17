import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import type { DB } from './types';

export function getTestDbInstance() {
  const db = new Kysely<DB>({
    dialect: new SqliteDialect({
      database: new Database(':memory:'),
    }),
  });

  db.schema
    .createTable('templates')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('text', 'text', (col) => col.notNull())
    .execute();

  db.schema
    .createTable('sprints')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('code', 'text', (col) => col.notNull())
    .addColumn('title', 'text', (col) => col.notNull())
    .execute();

  db.schema
    .createTable('messages')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('createdAt', 'text', (col) => col.notNull())
    .addColumn('gifUrl', 'text')
    .addColumn('message', 'text')
    .addColumn('sprintCode', 'text')
    .addColumn('username', 'text')
    .execute();

  return db;
}
