const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

require("dotenv").config();

client.once("ready", () => {
  console.info(`${client.user && client.user.tag} tá on galera`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply(`pong!`);
  } else if (commandName === "server") {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === "user") {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.member.id}`
    );
  }
});

client.login(`${process.env.TOKEN}`);
