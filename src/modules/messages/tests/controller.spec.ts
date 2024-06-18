import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import supertest from 'supertest';
import express from 'express';
import { Kysely } from 'kysely';
import { createMessagesRouter } from '../controller';
import { getTestDbInstance } from '../../../database/db-test';
import type { DB } from '@/database/types';
import { sendMessageToDiscord } from '../../../bot/utils/sendMessage';
import { getGIF } from '../../gifService/gifService';
import { getRandomTemplate } from '../../message-templates/services';

vi.mock('../../../bot/utils/sendMessage', () => ({
  sendMessageToDiscord: vi.fn(),
}));

vi.mock('../../gifService/gifService', () => ({
  getGIF: vi.fn(),
}));

vi.mock('../../message-templates/services', () => ({
  getRandomTemplate: vi.fn(),
}));

describe('Messages Controller', () => {
  let testDb: Kysely<DB>;
  let app: express.Application;

  beforeEach(async () => {
    testDb = getTestDbInstance();
    const messagesRouter = createMessagesRouter(testDb);
    app = express();
    app.use(express.json());
    app.use('/messages', messagesRouter);

    await testDb
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
      ])
      .execute();

    await testDb
      .insertInto('sprints')
      .values([{ code: 'TEST', title: 'Test Sprint Title' }])
      .execute();
  });

  afterEach(async () => {
    await testDb.destroy();
    vi.resetAllMocks();
  });

  describe("POST '/' endpoint", () => {
    it('should send message to Discord', async () => {
      const postData = {
        createdAt: new Date().toISOString(),
        gifUrl: 'test.com',
        message: 'TESTING',
        sprintCode: 'TEST',
        username: 'TEST USER',
      };

      // Mock the sendMessageToDiscord function
      const gifURLMock = 'test.com';
      const message = 'Test Sprint 1';

      const getGIFMock = getGIF as vi.Mock;
      const getRandomTemplateMock = getRandomTemplate as vi.Mock;
      const sendMessageToDiscordMock = sendMessageToDiscord as vi.Mock;

      getGIFMock.mockResolvedValueOnce(gifURLMock);
      getRandomTemplateMock.mockResolvedValueOnce(message);
      sendMessageToDiscordMock.mockResolvedValueOnce(undefined);

      const res = await supertest(app).post('/messages').send(postData);

      expect(res.status).toBe(200);
      expect(res.body.username).toBe('TEST USER');
      expect(res.body.sprintCode).toBe('TEST');
      expect(sendMessageToDiscordMock).toHaveBeenCalled();
      expect(sendMessageToDiscordMock).toHaveBeenCalledWith(
        expect.objectContaining({
          ...postData,
          gifUrl: gifURLMock,
          message,
        }),
        'Test Sprint Title'
      );
    });

    it('should return 500 for invalid input', async () => {
      const postData = {
        createdAt: new Date().toISOString(),
        username: 'TEST USER',
      };

      const gifURLMock = 'test.com';
      const message = 'Test Sprint 1';

      const getGIFMock = getGIF as vi.Mock;
      const getRandomTemplateMock = getRandomTemplate as vi.Mock;
      const sendMessageToDiscordMock = sendMessageToDiscord as vi.Mock;

      getGIFMock.mockResolvedValueOnce(gifURLMock);
      getRandomTemplateMock.mockResolvedValueOnce(message);
      sendMessageToDiscordMock.mockResolvedValueOnce(undefined);

      const res = await supertest(app).post('/messages').send(postData);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('err');
    });
  });
});
