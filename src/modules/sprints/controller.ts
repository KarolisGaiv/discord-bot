import { Router } from 'express';
import { z } from 'zod';
import { Kysely } from 'kysely';
import * as sprints from './services';
import * as schema from './schema';
import { DB } from '../../database';

export function createSprintsRouter(db: Kysely<DB>) {
  const router = Router();

  router.get('/', async (req, res) => {
    const query = {
      code: req.query.code || req.query.sprintCode,
      title: req.query.title || req.query.sprintTitle,
    };
    const parsedInput = schema.parsePartialInput(query);
    const { code, title } = parsedInput;
    try {
      // if no query provided, get all sprints
      if (Object.keys(req.query).length === 0) {
        const sprintList = await sprints.findAllSprints(db);
        res.status(200).json(sprintList);
      } else if (code) {
        // fetch sprint by code
        const sprintInfo = await sprints.findSprintByCode(db, code as string);
        res.status(200).json(sprintInfo);
      } else if (title) {
        // fetch sprint by title
        const sprintInfo = await sprints.findSprintByTitle(db, title as string);
        res.status(200).json(sprintInfo);
      } else {
        res.status(400).json({ err: 'Incorrect query provided' });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ err: err.errors });
      } else {
        res.status(500).json({ err: (err as Error).message });
      }
    }
  });

  router.post('/', async (req, res) => {
    try {
      const parsedInput = schema.parseNewSprintInput.parse(req.body);
      const newSprint = await sprints.createSprint(db, parsedInput);
      res.status(201).json(newSprint);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ err: err.errors });
      } else {
        res.status(500).json({ err: (err as Error).message });
      }
    }
  });

  router.patch('/:sprintId', async (req, res) => {
    try {
      const id = schema.parseId(req.params.sprintId);
      const body = schema.parsePartialInput(req.body);
      const updatedSprint = await sprints.update(db, id, body);

      if (!updatedSprint) {
        res.status(400).json({ err: 'Sprint not found' });
        return;
      }
      res.status(200).json(updatedSprint);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ err: err.errors });
      } else {
        res.status(500).json({ err: (err as Error).message });
      }
    }
  });

  router.delete('/:sprintId', async (req, res) => {
    try {
      const id = schema.parseId(req.params.sprintId);
      const sprintToDelete = await sprints.findSprintById(db, id);

      if (!sprintToDelete) {
        res.status(400).json({ err: 'Sprint not found' });
        return;
      }

      const deletedSprint = await sprints.remove(db, id);
      res.status(200).json(deletedSprint);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ err: err.errors });
      } else {
        res.status(500).json({ err: (err as Error).message });
      }
    }
  });

  return router;
}
