const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Vai para o momento exato da música"),
  async execute(interaction) {
    await interaction.reply("Momento X da música");
  },
};
