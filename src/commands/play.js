const { SlashCommandBuilder, blockQuote } = require("@discordjs/builders");
const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toca uma música através do link")
    .addStringOption((option) =>
      option
        .setName("provider")
        .setDescription("Escolha o provedor da música")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("song_url")
        .setDescription("Coloque o link da música")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    const provider = interaction.options.getString("provider");
    const song_url = interaction.options.getString("song_url");
    console.log("provider", provider);
    console.log("song_url", song_url);

    try {
      if (interaction.commandName === "play") {
        const voiceChannel = interaction.channel;

        const message = blockQuote(song_url);

        if (!voiceChannel)
          return interaction.reply(
            "Você precisa estar num canal para usar esse comando!"
          );

        await interaction.reply(`Você escolheu a música \n${message}`);
        await wait(1000);
        await interaction.followUp(`Tocando ${message} no ${provider}!`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
