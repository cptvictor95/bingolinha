const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Lista as informações do servidor."),
  async execute(interaction) {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.member.id}`
    );
  },
};
