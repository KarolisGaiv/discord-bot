import { Router } from 'express';
import { z } from 'zod';
import * as templates from './services';
import * as schema from './schema';
import db from '../../database';

const router = Router();

router.get('/', async (req, res) => {
  const parsedInput = schema.parseTemplateSchema(req.query);
  const { id, text } = parsedInput;

  try {
    if (id) {
      // fetch template by id
      const templateInfo = await templates.findTemplateById(db, id as number);
      res.status(200).json(templateInfo);
    } else {
      // fetch template by text
      const templateInfo = await templates.findTemplateByText(
        db,
        text as string
      );
      res.status(200).json(templateInfo);
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
    const body = schema.parseText(req.body.text);
    const newSprint = await templates.createTemplate(db, body);
    res.status(200).json(newSprint);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ err: err.errors });
    } else {
      res.status(500).json({ err: (err as Error).message });
    }
  }
});

router.patch('/:templateId', async (req, res) => {
  try {
    const id = schema.parseId(req.params.templateId);
    const updatedText = schema.parseText(req.body.text);
    const updatedSprint = await templates.update(db, id, updatedText);

    if (!updatedSprint) {
      res.status(400).json({ err: 'Template not found' });
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

router.delete('/:templateId', async (req, res) => {
  try {
    const id = schema.parseId(req.params.templateId);
    const templateToDelete = await templates.findTemplateById(db, id);

    if (!templateToDelete) {
      res.status(400).json({ err: 'Template not found' });
      return;
    }

    const deletedTemplate = await templates.remove(db, id);
    res.status(200).json(deletedTemplate);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ err: err.errors });
    } else {
      res.status(500).json({ err: (err as Error).message });
    }
  }
});

export default router;
