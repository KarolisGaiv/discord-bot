import type { Insertable, Kysely, Updateable } from 'kysely';
import { type Templates } from '@/database';
import type {DB} from "@/database/types"

type TemplateWithoutId = Omit<Templates, 'id'>;

export function findTemplateById(db: Kysely<DB>, id: number) {
  return db
    .selectFrom('templates')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirstOrThrow();
}

export function findTemplateByText(db: Kysely<DB>, text: string) {
  return db
    .selectFrom('templates')
    .selectAll()
    .where('text', '=', text)
    .executeTakeFirstOrThrow();
}

export function createTemplate(db: Kysely<DB>, text: Insertable<TemplateWithoutId>) {
  return db
    .insertInto('templates')
    .values(text)
    .returningAll()
    .executeTakeFirst();
}

export function update(db: Kysely<DB>, id: number, text: Updateable<TemplateWithoutId>) {
  return db
    .updateTable('templates')
    .set(text)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function remove(db: Kysely<DB>, id: number) {
  return db
    .deleteFrom('templates')
    .where('id', '=', id)
    .returningAll()
    .execute();
}

export async function getRandomTemplate(db: Kysely<DB>) {
  try {
    const allTemplates = await db.selectFrom('templates').selectAll().execute();

    if (!allTemplates) {
      throw new Error('No templates found');
    }

    const randomIndex = Math.floor(Math.random() * allTemplates.length);
    const randomTemplate = allTemplates[randomIndex].text;

    return randomTemplate;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching random message template', error);
    throw new Error('Failed to fetch random message template');
  }
}
