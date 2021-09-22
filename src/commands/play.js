const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Coloca as crianças para nanar"),
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;
    try {
      if (interaction.commandName === "play") {
        const voiceChannel = interaction.channel;

        if (!voiceChannel)
          return interaction.reply(
            "Você precisa estar num canal para usar esse comando!"
          );

        console.log("member", command.member);
        // console.log("voiceChannel", voiceChannel);

        await interaction.reply(
          `Você escolheu a música ${interaction.message}!`
        );
        await wait(1000);
        await interaction.followUp(`A música está tá tocando!`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
