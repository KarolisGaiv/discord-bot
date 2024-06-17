import { Kysely } from 'kysely';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import { getTestDbInstance } from '../../../database/db-test';
import * as messageService from '../service';
import type { DB } from '../../../database/types';

describe('Message Service', () => {
  let db: Kysely<DB>;

  beforeEach(async () => {
    db = getTestDbInstance();
    await db
      .insertInto('messages')
      .values([
        {
          createdAt: new Date().toISOString(),
          gifUrl: 'gif1',
          message: 'Hello',
          sprintCode: 'SP1',
          username: 'user1',
        },
        {
          createdAt: new Date().toISOString(),
          gifUrl: 'gif2',
          message: 'World',
          sprintCode: 'SP2',
          username: 'user2',
        },
        {
          createdAt: new Date().toISOString(),
          gifUrl: 'gif3',
          message: 'Another message',
          sprintCode: 'SP1',
          username: 'user1',
        },
      ])
      .execute();
  });

  afterEach(async () => {
    await db.deleteFrom('messages').execute();
  });

  // Test: findAllMessages
  it('should fetch all messages', async () => {
    const messages = await messageService.findAllMessages(db);
    expect(messages).toHaveLength(3);
  });

  // Test: findMessagesByUserName
  it('should fetch messages by username', async () => {
    const messages = await messageService.findMessagesByUserName(db, 'user1');
    expect(messages).toHaveLength(2);
    expect(messages[0]).toEqual(
      expect.objectContaining({ message: 'Hello', username: 'user1' })
    );
  });

  it('should throw an error if no messages found for the username', async () => {
    await expect(
      messageService.findMessagesByUserName(db, 'user3')
    ).rejects.toThrowError('User not found');
  });

  // Test: findMessagesBySprintCode
  it('should fetch messages by sprint code', async () => {
    const messages = await messageService.findMessagesBySprintCode(db, 'SP1');
    expect(messages).toHaveLength(2);
  });

  it('should throw an error if no messages found for the sprint code', async () => {
    await expect(
      messageService.findMessagesBySprintCode(db, 'SP3')
    ).rejects.toThrowError('Sprint code not found');
  });

  // Test: create
  it('should create a new message', async () => {
    const newMessage = await messageService.create(db, {
      createdAt: new Date().toISOString(),
      gifUrl: 'newGif',
      message: 'New message',
      sprintCode: 'SP1',
      username: 'user1',
    });
    expect(newMessage).toEqual(
      expect.objectContaining({ message: 'New message', username: 'user1' })
    );
  });
});
