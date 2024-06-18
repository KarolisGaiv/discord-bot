import express from 'express';
import './bot/discordBot';
import db from './database/index';
import { createMessagesRouter } from './modules/messages/controller';
import { createTemplatesRouter } from './modules/message-templates/controller';
import { createSprintsRouter } from './modules/sprints/controller';

const app = express();
app.use(express.json());
const sprintsRouter = createSprintsRouter(db);
const templatesRouter = createTemplatesRouter(db);
const messagesRouter = createMessagesRouter(db);

app.use('/messages', messagesRouter);
app.use('/templates', templatesRouter);
app.use('/sprints', sprintsRouter);

export default app;
