import 'dotenv/config';
import { client } from '../discordBot';

interface MessageData {
  username: string;
  message: string;
  gifUrl: string;
  sprintCode: string;
}

const { DISCORD_CHANNEL_ID } = process.env;

export async function sendMessageToDiscord(
  messageData: MessageData,
  sprintTitle: string
) {
  if (!DISCORD_CHANNEL_ID) {
    throw new Error(
      'Please provide the Discord Channel ID in your environment variables.'
    );
  }

  try {
    if (!client.isReady()) {
      throw new Error('Discord client is not ready');
    }

    // Fetch channel
    const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);

    // Check if the channel exists and is text-based
    if (!channel || !channel.isTextBased()) {
      throw new Error('Discord channel not found or is not text-based.');
    }

    const { username, message, gifUrl } = messageData;

    // Send the message to the channel
    await channel.send(
      `${username} has just completed ${sprintTitle}!\n${message}`
    );
    await channel.send(gifUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to send message to Discord:', error);
    throw error;
  }
}
