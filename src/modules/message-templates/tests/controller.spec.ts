import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import express from 'express';
import { Kysely } from 'kysely';
import { createTemplatesRouter } from '../controller';
import { getTestDbInstance } from '../../../database/db-test';
import type { DB } from '@/database/types';

describe('Templates Controller', () => {
  let testDb: Kysely<DB>;
  let app: express.Application;

  beforeEach(async () => {
    testDb = getTestDbInstance();
    const templatesRouter = createTemplatesRouter(testDb);
    app = express();
    app.use(express.json());
    app.use('/templates', templatesRouter);

    await testDb
      .insertInto('templates')
      .values([
        { id: 1, text: 'Test Sprint 1' },
        { id: 2, text: 'Test Sprint 2' },
      ])
      .execute();
  });

  afterEach(async () => {
    await testDb.destroy();
  });

  describe("GET '/' endpoint", () => {
    it('should get message template by id', async () => {
      const res = await supertest(app).get('/templates?id=1');
      expect(res.status).toBe(200);
      expect(res.body.text).toBe('Test Sprint 1');
    });

    it('should get message template by text', async () => {
      const res = await supertest(app).get('/templates?text=Test Sprint 2');
      expect(res.status).toBe(200);
      expect(res.body.text).toBe('Test Sprint 2');
    });

    it('should return 400 for invalid query params', async () => {
      const res = await supertest(app).get('/templates?invalid=invalid');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        err: 'Please provide either id or text query parameter.',
      });
    });

    it('should return 500 if template not found by text', async () => {
      const res = await supertest(app).get('/templates?text=NONEXISTENT');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ err: 'no result' });
    });

    it('should return 500 if template not found by id', async () => {
      const res = await supertest(app).get('/templates?id=999');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ err: 'no result' });
    });
  });
});
