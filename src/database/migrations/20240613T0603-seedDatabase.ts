import { Kysely } from 'kysely';
import { DB } from '../types';

export async function up(db: Kysely<DB>): Promise<void> {
  // Insert initial templates
  await db
    .insertInto('templates')
    .values([
      { text: 'You nailed it!' },
      { text: 'You did it! I knew you could.' },
      { text: 'Great job on completing the sprint!' },
      { text: 'Outstanding performance!' },
      { text: 'You’re a superstar!' },
      { text: 'Fantastic job!' },
      { text: 'Keep up the great work!' },
      { text: 'Impressive effort!' },
    ])
    .execute();

  // Insert initial sprints
  await db
    .insertInto('sprints')
    .values([
      { code: 'WD-1.1', title: 'Web Development Sprint 1.1' },
      { code: 'WD-1.2', title: 'Web Development Sprint 1.2' },
      { code: 'WD-1.3', title: 'Web Development Sprint 1.3' },
      { code: 'WD-1.4', title: 'Web Development Sprint 1.4' },
      { code: 'WD-2.1', title: 'Web Development Sprint 2.1' },
      { code: 'WD-2.2', title: 'Web Development Sprint 2.2' },
      { code: 'WD-2.3', title: 'Web Development Sprint 2.3' },
      { code: 'WD-2.4', title: 'Web Development Sprint 2.4' },
      { code: 'WD-3.1', title: 'Web Development Sprint 3.1' },
      { code: 'WD-3.2', title: 'Web Development Sprint 3.2' },
      { code: 'WD-3.3', title: 'Web Development Sprint 3.3' },
      { code: 'WD-3.4', title: 'Web Development Sprint 3.4' },
      { code: 'WD-4.1', title: 'Web Development Sprint 4.1' },
      { code: 'WD-4.2', title: 'Web Development Sprint 4.2' },
      { code: 'WD-4.3', title: 'Web Development Sprint 4.3' },
      { code: 'WD-4.4', title: 'Web Development Sprint 4.4' },
    ])
    .execute();

  // Insert initial messages
  await db
    .insertInto('messages')
    .values([
      {
        username: 'johndoe',
        sprint_code: 'WD-1.1',
        message: 'You nailed it!',
        gif_url: 'https://giphy.com/some-gif-url',
      },
      {
        username: 'janedoe',
        sprint_code: 'WD-1.1',
        message: 'You did it! I knew you could.',
        gif_url: 'https://giphy.com/some-gif-url-2',
      },
      {
        username: 'alice',
        sprint_code: 'WD-1.2',
        message: 'Great job on completing the sprint!',
        gif_url: 'https://giphy.com/some-gif-url-3',
      },
      {
        username: 'bob',
        sprint_code: 'WD-1.3',
        message: 'Outstanding performance!',
        gif_url: 'https://giphy.com/some-gif-url-4',
      },
      {
        username: 'charlie',
        sprint_code: 'WD-1.4',
        message: 'You’re a superstar!',
        gif_url: 'https://giphy.com/some-gif-url-5',
      },
      {
        username: 'johndoe',
        sprint_code: 'WD-2.1',
        message: 'Fantastic job!',
        gif_url: 'https://giphy.com/some-gif-url-6',
      },
      {
        username: 'janedoe',
        sprint_code: 'WD-2.2',
        message: 'Keep up the great work!',
        gif_url: 'https://giphy.com/some-gif-url-7',
      },
      {
        username: 'alice',
        sprint_code: 'WD-2.3',
        message: 'Impressive effort!',
        gif_url: 'https://giphy.com/some-gif-url-8',
      },
      {
        username: 'bob',
        sprint_code: 'WD-2.4',
        message: 'You nailed it!',
        gif_url: 'https://giphy.com/some-gif-url-9',
      },
      {
        username: 'charlie',
        sprint_code: 'WD-3.1',
        message: 'You did it! I knew you could.',
        gif_url: 'https://giphy.com/some-gif-url-10',
      },
      {
        username: 'johndoe',
        sprint_code: 'WD-3.2',
        message: 'Great job on completing the sprint!',
        gif_url: 'https://giphy.com/some-gif-url-11',
      },
      {
        username: 'janedoe',
        sprint_code: 'WD-3.3',
        message: 'Outstanding performance!',
        gif_url: 'https://giphy.com/some-gif-url-12',
      },
      {
        username: 'alice',
        sprint_code: 'WD-3.4',
        message: 'You’re a superstar!',
        gif_url: 'https://giphy.com/some-gif-url-13',
      },
      {
        username: 'bob',
        sprint_code: 'WD-4.1',
        message: 'Fantastic job!',
        gif_url: 'https://giphy.com/some-gif-url-14',
      },
      {
        username: 'charlie',
        sprint_code: 'WD-4.2',
        message: 'Keep up the great work!',
        gif_url: 'https://giphy.com/some-gif-url-15',
      },
      {
        username: 'johndoe',
        sprint_code: 'WD-4.3',
        message: 'Impressive effort!',
        gif_url: 'https://giphy.com/some-gif-url-16',
      },
      {
        username: 'janedoe',
        sprint_code: 'WD-4.4',
        message: 'You nailed it!',
        gif_url: 'https://giphy.com/some-gif-url-17',
      },
      {
        username: 'alice',
        sprint_code: 'WD-1.1',
        message: 'You did it! I knew you could.',
        gif_url: 'https://giphy.com/some-gif-url-18',
      },
      {
        username: 'bob',
        sprint_code: 'WD-1.2',
        message: 'Great job on completing the sprint!',
        gif_url: 'https://giphy.com/some-gif-url-19',
      },
      {
        username: 'charlie',
        sprint_code: 'WD-1.3',
        message: 'Outstanding performance!',
        gif_url: 'https://giphy.com/some-gif-url-20',
      },
      {
        username: 'johndoe',
        sprint_code: 'WD-1.4',
        message: 'You’re a superstar!',
        gif_url: 'https://giphy.com/some-gif-url-21',
      },
      {
        username: 'janedoe',
        sprint_code: 'WD-2.1',
        message: 'Fantastic job!',
        gif_url: 'https://giphy.com/some-gif-url-22',
      },
      {
        username: 'alice',
        sprint_code: 'WD-2.2',
        message: 'Keep up the great work!',
        gif_url: 'https://giphy.com/some-gif-url-23',
      },
      {
        username: 'bob',
        sprint_code: 'WD-2.3',
        message: 'Impressive effort!',
        gif_url: 'https://giphy.com/some-gif-url-24',
      },
      {
        username: 'charlie',
        sprint_code: 'WD-2.4',
        message: 'You nailed it!',
        gif_url: 'https://giphy.com/some-gif-url-25',
      },
    ])
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db
    .deleteFrom('messages')
    .where('username', 'in', ['johndoe', 'janedoe', 'alice', 'bob', 'charlie'])
    .execute();
  await db.deleteFrom('sprints').where('code', 'like', 'WD-%').execute();
  await db
    .deleteFrom('templates')
    .where('text', 'in', [
      'You nailed it!',
      'You did it! I knew you could.',
      'Great job on completing the sprint!',
      'Outstanding performance!',
      'You’re a superstar!',
      'Fantastic job!',
      'Keep up the great work!',
      'Impressive effort!',
    ])
    .execute();
}
