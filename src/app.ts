import express from 'express';
import './bot/discordBot';
import messages from './modules/messages/controller';
import messageTemplates from './modules/message-templates/controller';
import sprints from './modules/sprints/controller';

const app = express();
app.use(express.json());

app.use('/messages', messages);
app.use('/templates', messageTemplates);
app.use('/sprints', sprints);

export default app;
