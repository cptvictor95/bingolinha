const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lista todos os comandos do bot com suas descrições."),
  async execute(interaction) {
    try {
      const commands = interaction.client.commands;

      const commandList = commands.map((command) => {
        const infos = `\n/${command.data.name} - ${command.data.description}`;

        return infos;
      });

      await interaction.reply(`Todos os comandos: \n${commandList}`);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
