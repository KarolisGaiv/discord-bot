import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const { DISCORD_TOKEN, DISCORD_CHANNEL_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CHANNEL_ID) {
  throw new Error(
    'Please provide Discord Bot API Key and Channel ID in your environment variables.'
  );
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Discord bot is ready! Logged in as ${readyClient.user.tag}`);
});

client.login(DISCORD_TOKEN);

export async function sendMessageToDiscord(messageData) {
  try {
    // Ensure the client is ready before sending messages
    if (!client.isReady()) {
      throw new Error('Discord client is not ready');
    }

    // Fetch the channel
    const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);

    // Check if the channel exists and is text-based
    if (!channel || !channel.isTextBased()) {
      throw new Error('Discord channel not found or is not text-based.');
    }

    const { username, sprintCode, message, gifUrl } = messageData;

    // Send the message to the channel
    await channel.send(
      `${message} - ${username} completed sprint ${sprintCode}!`
    );
    await channel.send(gifUrl);
  } catch (error) {
    console.error('Failed to send message to Discord:', error);
    throw error;
  }
}
