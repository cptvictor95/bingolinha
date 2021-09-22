const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Importing dotenv config vars
require("dotenv").config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId =
  process.env.NODE_ENV === "dev"
    ? process.env.DEV_GUILD_ID
    : process.env.PROD_GUILD_ID;

// Reads the commands folder and filters it to show only .js files
const commands = [];
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

// Loops over all files inside the commands folder
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Sets the bot API token for the API requests
const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.info("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.info("Successfully registered application commands.");
  } catch (error) {
    throw new Error(error.message);
  }
})();
