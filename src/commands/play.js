const { SlashCommandBuilder, blockQuote } = require("@discordjs/builders");
const wait = require("util").promisify(setTimeout);
const ytdl = require("ytdl-core");
const {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toca uma música através do link")
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

    const song_url = interaction.options.getString("song_url");
    console.log("song_url", song_url);

    try {
      if (interaction.commandName === "play") {
        const voiceChannel = interaction.channel;
        const guild = interaction.guild;

        if (!voiceChannel || !guild)
          return interaction.reply(
            "Você precisa estar num canal para usar esse comando!"
          );

        console.log("guildId", guild.id);
        console.log("voiceChannel", voiceChannel.id);
        console.log("adapterCreator", guild.voiceAdapterCreator);
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: guild.id,
          adapterCreator: guild.voiceAdapterCreator,
        });

        const stream = ytdl(song_url, { filter: "audioonly" });
        const resource = createAudioResource(stream, {
          inputType: StreamType.Arbitrary,
        });
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => connection.destroy());

        const message = blockQuote(song_url);

        await interaction.reply(`Procurando a música...`);
        await wait(1000);
        await interaction.followUp(`Tocando \n${message}`);
      }
    } catch (error) {
      await interaction.reply(`Deu erro: ${error.message}`);
      throw new Error(error.message);
    }
  },
};
