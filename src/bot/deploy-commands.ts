import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const {
  DISCORD_CLIENT_ID: clientId,
  DISCORD_GUILD_ID: guildId,
  DISCORD_TOKEN: token,
} = process.env;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const commands = [];

async function loadCommands(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const commandPromises = entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await loadCommands(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.ts')) {
        const command = await import(fullPath);

        // Check for named exports 'data' and 'execute'
        if ('data' in command && 'execute' in command) {
          commands.push(command.data.toJSON());
        } else {
          console.log(
            `[WARNING] The command at ${fullPath} is missing a required "data" or "execute" property.`
          );
        }
      }
    });

    await Promise.all(commandPromises);
  } catch (error) {
    console.error('Failed to load commands:', error);
  }
}

async function deployCommands() {
  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error('Error reloading application (/) commands:', error);
  }
}

(async () => {
  await loadCommands(path.join(dirname, 'commands'));
  await deployCommands();
})();
