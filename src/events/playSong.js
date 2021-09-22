module.exports = {
  name: "playSong",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    console.info(
      `${interaction.user.tag} in #${interaction.channel.name} triggered /${interaction.commandName}.`
    );

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error.message);
      await interaction.reply({
        content: `Erro com o comando ${interaction.commandName}: \nMensagem do erro: ${error.message}`,
        ephemeral: true,
      });
    }
  },
};
