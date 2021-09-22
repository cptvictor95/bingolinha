const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lista todos os comandos do bot"),
  async execute(interaction) {
    try {
      await interaction.reply(
        "Lista de todos os comandos: \nuser\nserver\nplay\nseek\nhelp"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
