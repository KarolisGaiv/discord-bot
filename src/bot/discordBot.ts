import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const { DISCORD_TOKEN, DISCORD_CHANNEL_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CHANNEL_ID) {
  throw new Error(
    'Please provide Discord Bot API Key and Channel ID in your environment variables.'
  );
}

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Discord bot is ready! Logged in as ${readyClient.user.tag}`);
});

client.login(DISCORD_TOKEN);