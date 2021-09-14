const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Importing dotenv config vars
require("dotenv").config();

const token = process.env.TOKEN;

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);
}

// Messaging as the server starts
client.once("ready", () => {
  console.info(`${client.user && client.user.tag} tá on galera`);
});

// Creating interaction commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error.message);
    await interaction.reply({ content: "Erro com o comando", ephemeral: true });
  }
});

client.login(`${token}`);
