import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import express from 'express';
import { Kysely } from 'kysely';
import { createSprintsRouter } from '../controller';
import { getTestDbInstance } from '../../../database/db-test';
import type { DB } from '@/database/types';

describe('Sprints Controller', () => {
  let testDb: Kysely<DB>;
  let app: express.Application;

  beforeAll(async () => {
    testDb = getTestDbInstance();
    const sprintsRouter = createSprintsRouter(testDb);
    app = express().use('/sprints', sprintsRouter);

    await testDb
      .insertInto('sprints')
      .values([
        { code: 'TST1', title: 'Test Sprint 1' },
        { code: 'TST2', title: 'Test Sprint 2' },
      ])
      .execute();
  });

  afterAll(async () => {
    await testDb.destroy();
  });

  describe("GET '/' endpoint", () => {
    it('should get all sprints', async () => {
      const res = await supertest(app).get('/sprints');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body).toEqual(
        expect.arrayContaining([
          { id: 1, code: 'TST1', title: 'Test Sprint 1' },
          { id: 2, code: 'TST2', title: 'Test Sprint 2' },
        ])
      );
    });

    it('should get sprint by code', async () => {
      const res = await supertest(app).get('/sprints?code=TST1');
      expect(res.status).toBe(200);
      expect(res.body.code).toBe('TST1');
    });

    it('should get sprint by title', async () => {
      const res = await supertest(app).get('/sprints?title=Test Sprint 2');
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Sprint 2');
    });

    it.skip('should return 400 for invalid query params', async () => {
      const res = await supertest(app).get('/sprints?code=invalid');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('err');
    });

    it('should return 500 if sprint not found by code', async () => {
      const res = await supertest(app).get('/sprints?code=NONEXISTENT');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ err: 'no result' });
    });

    it('should return 500 if sprint not found by title', async () => {
      const res = await supertest(app).get('/sprints?title=NONEXISTENT');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ err: 'no result' });
    });
  });

  describe.skip("POST '/' endpoint", () => {
    it('should create a new sprint', async () => {
      const newSprint = { code: 'TST3', title: 'Test Sprint 3' };

      const res = await supertest(app).post('/sprints').send(newSprint);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          code: 'TST3',
          title: 'Test Sprint 3',
        })
      );

      const allSprints = await supertest(app).get('/sprints');
      expect(allSprints.body).toHaveLength(3);
    });
  });

  describe.skip("PATCH '/:id' endpoint", () => {
    it('should partially update an existing sprint', async () => {
      const updateData = { title: 'Updated Sprint Title' };
      const existingSprintId = 1;

      const res = await supertest(app)
        .patch(`/sprints/${existingSprintId}`)
        .send(updateData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(res.status).toBe(200);

      expect(res.body.title).toBe('Updated Sprint Title');

      const updatedSprintRes = await supertest(app).get(
        `/sprints/${existingSprintId}`
      );
      expect(updatedSprintRes.status).toBe(200);
      expect(updatedSprintRes.body.title).toBe('Updated Sprint Title');
    });

    it.skip('should return 400 for invalid update data', async () => {
      const invalidUpdateData = { title: '' };

      const existingSprintId = 1;

      const res = await supertest(app)
        .patch(`/sprints/${existingSprintId}`)
        .set('Content-Type', 'application/json')
        .send(invalidUpdateData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('err');
    });

    it.skip('should return 500 if sprint to update is not found', async () => {
      const nonExistentSprintId = 999;

      const updateData = { title: 'Updated Title' };

      const res = await supertest(app)
        .patch(`/sprints/${nonExistentSprintId}`)
        .set('Content-Type', 'application/json')
        .send(updateData);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ err: 'Sprint not found' });
    });
  });
});
