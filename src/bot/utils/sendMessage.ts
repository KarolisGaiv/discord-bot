import 'dotenv/config';
import { client } from "../discordBot";

const { DISCORD_CHANNEL_ID } = process.env;

export async function sendMessageToDiscord(messageData, sprintTitle) {
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
      console.error('Failed to send message to Discord:', error);
      throw error;
    }
  }