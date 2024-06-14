import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
    await db.schema
      .createTable('sprints')
      .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
      .addColumn('code', 'text', (c) => c.notNull())
      .addColumn('title', 'text', (c) => c.notNull())
      .execute()
  }
  
  export async function down(db: Kysely<SqliteDatabase>) {
    await db.schema.dropTable('sprints').execute()
  }
  