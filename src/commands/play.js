const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Coloca as crianças para nanar"),
  async execute(interaction) {
    await interaction.reply("A música está tocando");
  },
};
