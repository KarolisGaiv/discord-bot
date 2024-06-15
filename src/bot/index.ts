import 'dotenv/config';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const { DISCORD_TOKEN } = process.env;
if (!DISCORD_TOKEN) {
    throw new Error("Please provide Discord Bot API Key in your environment variables.");
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const commandsPath = path.join(dirName, 'commands');

async function loadCommands(dir) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        const commandPromises = entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                // Recursively load commands from subdirectories
                await loadCommands(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.ts')) {
                const command = await import(fullPath);

                // Check for named exports 'data' and 'execute'
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at ${fullPath} is missing a required "data" or "execute" property.`);
                }
            }
        });

        await Promise.all(commandPromises);
    } catch (err) {
        console.error(`Failed to load commands:`, err);
    }
}

loadCommands(commandsPath);

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});
