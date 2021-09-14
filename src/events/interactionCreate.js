module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    console.info(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error.message);
      await interaction.reply({
        content: "Erro com o comando",
        ephemeral: true,
      });
    }
  },
};
