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
      expect(res.body.id).toBe(1);
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

  describe("POST '/' endpoint", () => {
    it('should create new message template', async () => {
      // before adding new template
      const before = await supertest(app).get('/templates?text=NEW TEMPLATE');
      expect(before.status).toBe(500);
      expect(before.body).toEqual({ err: 'no result' });

      // add new template
      const res = await supertest(app)
        .post('/templates')
        .send({ text: 'NEW TEMPLATE' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          text: 'NEW TEMPLATE',
        })
      );

      // after adding new template
      const after = await supertest(app).get('/templates?text=NEW TEMPLATE');
      expect(after.status).toBe(200);
      expect(after.body.text).toBe('NEW TEMPLATE');
    });

    it('should return 400 for invalid input', async () => {
      const invalidInput = { text: '' };
      const response = await supertest(app)
        .post('/templates')
        .send(invalidInput);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('err');
    });

    it('should return 400 for invalid input', async () => {
      const invalidInput = { invalid: 'INVALID' };
      const response = await supertest(app)
        .post('/templates')
        .send(invalidInput);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('err');
    });
  });

  describe("PATCH '/:templateId' endpoint", () => {
    it('should update existing template', async () => {
      const updateData = { text: 'Updating text' };
      const existingTemplateId = 1;

      const res = await supertest(app)
        .patch(`/templates/${existingTemplateId}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.text).toBe('Updating text');
    });

    it('should return 400 for invalid update data', async () => {
      const invalidUpdateData = { text: '' };
      const existingTemplateId = 1;

      const res = await supertest(app)
        .patch(`/templates/${existingTemplateId}`)
        .send(invalidUpdateData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('err');
    });

    it('should return 400 if template to update is not found', async () => {
      const nonExistentId = 999;
      const updateData = { text: 'Updating text' };
      const res = await supertest(app)
        .patch(`/templates/${nonExistentId}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ err: 'Template not found' });
    });
  });

  describe("DELETE '/:id' endpoint", () => {
    it('should delete template', async () => {
      const res = await supertest(app).delete('/templates/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining([
          {
            id: 1,
            text: 'Test Sprint 1',
          },
        ])
      );
    });

    it('should return 500 if template to delete is not found', async () => {
      const res = await supertest(app).delete('/templates/999999999');

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('err');
    });
  });
});
