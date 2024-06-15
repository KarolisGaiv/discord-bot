import { Kysely, SqliteDatabase, sql } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('messages')
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('username', 'text', (c) => c.notNull())
    .addColumn('sprint_code', 'text', (c) => c.notNull())
    .addColumn('message', 'text', (c) => c.notNull())
    .addColumn('gifUrl', 'text', (c) => c.notNull())
    .addColumn('createdAt', 'datetime', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('messages').execute();
}
