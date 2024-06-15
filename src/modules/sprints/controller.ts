import { Router } from 'express';
import { z } from 'zod';
import * as sprints from './services';
import * as schema from './schema';

const router = Router();

router.get('/', async (req, res) => {
  const parsedInput = schema.parsePartialInput(req.query);
  const { code, title } = parsedInput;

  try {
    if (code) {
      // fetch sprint by sprint code
      const sprintInfo = await sprints.findSprintByCode(code as string);
      res.status(200).json(sprintInfo);
    } else if (title) {
      // fetch sprint by title
      const sprintInfo = await sprints.findSprintByTitle(title as string);
      res.status(200).json(sprintInfo);
    } else {
      // get all sprints
      const sprintList = await sprints.findAllSprints();
      res.status(200).json(sprintList);
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
    const body = schema.parseNewSprintInput(req.body);
    const newSprint = await sprints.createSprint(body);
    res.status(200).json(newSprint);
  } catch (err) {
    res.status(500).json({ err: (err as Error).message });
  }
});

router.patch('/:sprintId', async (req, res) => {
  try {
    const id = schema.parseId(req.params.sprintId);
    const body = schema.parsePartialInput(req.body);
    const updatedSprint = await sprints.update(id, body);

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
    const sprintToDelete = await sprints.findSprintById(id);

    if (!sprintToDelete) {
      res.status(400).json({ err: 'Sprint not found' });
      return;
    }

    const deletedSprint = await sprints.remove(id);
    res.status(200).json(deletedSprint);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ err: err.errors });
    } else {
      res.status(500).json({ err: (err as Error).message });
    }
  }
});

export default router;
