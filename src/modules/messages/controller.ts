import { Router } from 'express';
import { z } from 'zod';
import * as messages from './service';
import * as schema from './schema';
import { getGIF } from '../gifService/gifService';
import { getRandomTemplate } from '../message-templates/services';
import { findSprintByCode } from '../sprints/services';
import { sendMessageToDiscord } from '@/bot/utils/sendMessage';

const router = Router();

// Get all messages or filter by userName or sprintCode
router.get('/', async (req, res) => {
  // normalize query params (accept username, userName, code, sprintCode as query params)
  const query = {
    username: req.query.userName || req.query.username,
    sprintCode: req.query.code || req.query.sprintCode,
  };

  const parsedInput = schema.parsePartialInput(query);
  const { username, sprintCode } = parsedInput;

  try {
    if (username) {
      // Fetch messages for the specific user from the database
      const messagesList = await messages.findMessagesByUserName(
        username as string
      );
      res.status(200).json(messagesList);
    } else if (sprintCode) {
      // Fetch messages for the specific sprint from the database
      const messagesList = await messages.findMessagesBySprintCode(
        sprintCode as string
      );
      res.status(200).json(messagesList);
    } else {
      // Fetch all messages from the database
      const messagesList = await messages.findAllMessages();
      res.status(200).json(messagesList);
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ err: err.errors });
    } else {
      res.status(500).json({ err: (err as Error).message });
    }
  }
});

// Send success message to Discord
router.post('/', async (req, res) => {
  try {
    const gifUrl = await getGIF();
    const message = await getRandomTemplate();
    const { title } = await findSprintByCode(req.body.sprintCode);

    // Combine the message body with the fetched gifUrl
    const newMessageData = {
      ...req.body,
      message,
      gifUrl,
    };

    schema.parseFullSchema(newMessageData);

    const newMessage = await messages.create(newMessageData);

    await sendMessageToDiscord(newMessageData, title);
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ err: (err as Error).message });
  }
});

export default router;
