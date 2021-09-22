const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    console.info("interaction", interaction);

    await interaction.reply(`Ping: `);
  },
};
