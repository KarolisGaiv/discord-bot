import { Kysely } from 'kysely';
import { DB } from '../types';

export async function up(db: Kysely<DB>): Promise<void> {
  // Insert initial templates
  await db.insertInto('templates').values([
    { text: 'You nailed it!' },
    { text: 'You did it! I knew you could.' },
    { text: 'Great job on completing the sprint!' },
  ]).execute();

  // Insert initial sprints
  await db.insertInto('sprints').values([
    { code: 'WD-1.1', title: 'Web Development Sprint 1.1' },
    { code: 'WD-1.2', title: 'Web Development Sprint 1.2' },
  ]).execute();

  // Insert initial messages
  await db.insertInto('messages').values([
    {
      username: 'johndoe',
      sprintCode: 'WD-1.1',
      message: 'You nailed it!',
      gifUrl: 'https://giphy.com/some-gif-url',
    },
  ]).execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom('messages').where('username', '=', 'johndoe').execute();
  await db.deleteFrom('sprints').where('code', 'in', ['WD-1.1', 'WD-1.2']).execute();
  await db.deleteFrom('templates').where('text', 'in', ['You nailed it!', 'You did it! I knew you could.', 'Great job on completing the sprint!']).execute();
}
