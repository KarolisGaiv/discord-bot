import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import express from 'express';
import { Kysely } from 'kysely';
import { createSprintsRouter } from '../controller';
import { getTestDbInstance } from '../../../database/db-test';
import type { DB } from '@/database/types';

describe('Sprints Controller', () => {
  let testDb: Kysely<DB>;
  let app: express.Application;

  beforeEach(async () => {
    testDb = getTestDbInstance();
    const sprintsRouter = createSprintsRouter(testDb);
    app = express();
    app.use(express.json());
    app.use('/sprints', sprintsRouter);

    await testDb
      .insertInto('sprints')
      .values([
        { code: 'TST1', title: 'Test Sprint 1' },
        { code: 'TST2', title: 'Test Sprint 2' },
      ])
      .execute();
  });

  afterEach(async () => {
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

  describe("POST '/' endpoint", () => {
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

    it('should return 400 for invalid input', async () => {
      const invalidInput = { code: 'TST3' };

      const response = await supertest(app).post('/sprints').send(invalidInput);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('err');
    });

    it('should return 400 for invalid input', async () => {
      const invalidInput = { code: 'TST3', title: '' };

      const response = await supertest(app).post('/sprints').send(invalidInput);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('err');
    });
  });

  describe("PATCH '/:id' endpoint", () => {
    it('should partially update an existing sprint', async () => {
      const updateData = { title: 'Updated Sprint Title' };
      const existingSprintId = 1;

      const res = await supertest(app)
        .patch(`/sprints/${existingSprintId}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Sprint Title');
    });

    it('should return 400 for invalid update data', async () => {
      const invalidUpdateData = { title: '' };
      const existingSprintId = 1;

      const res = await supertest(app)
        .patch(`/sprints/${existingSprintId}`)
        .set('Content-Type', 'application/json')
        .send(invalidUpdateData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('err');
    });

    it('should return 500 if sprint to update is not found', async () => {
      const nonExistentSprintId = 999;

      const updateData = { title: 'Updated Title' };

      const res = await supertest(app)
        .patch(`/sprints/${nonExistentSprintId}`)
        .set('Content-Type', 'application/json')
        .send(updateData);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ err: 'no result' });
    });
  });

  describe("DELETE '/:id' endpoint", () => {
    it('should delete a sprint', async () => {
      const response = await supertest(app).delete(`/sprints/1`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining([
          {
            id: 1,
            code: 'TST1',
            title: 'Test Sprint 1',
          },
        ])
      );
    });

    it('should return 400 if sprint to delete is not found', async () => {
      const nonExistentSprintId = 999;
      const response = await supertest(app).delete(
        `/sprints/${nonExistentSprintId}`
      );

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ err: 'Sprint not found' });
    });
  });
});
