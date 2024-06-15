import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

export async function execute(interaction) {
    await interaction.reply('https://media0.giphy.com/media/DYH297XiCS2Ck/giphy.gif?cid=bcd3895fobiy7y5basnecggtsvxdc5i81y3fswgczjzmfo7q&ep=v1_gifs_random&rid=giphy.gif&ct=g');
}
