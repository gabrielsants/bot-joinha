//Library files
import {
  Client,
  GuildChannel,
  GuildMember,
  GuildMemberManager,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import { config } from "dotenv";
import { loadCommands } from "./utils/load-commands";

//Local files
config();
const { PREFIX, DISCORD_TOKEN } = process.env;

//Enable some intents to collect data from guild
export const client: Client = new Client({
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MESSAGES",
      "GUILD_INVITES",
      "GUILD_MEMBERS",
      "GUILD_PRESENCES",
      "GUILD_VOICE_STATES",
    ],
  },
});

export const commands = loadCommands();

client.on("message", async (message) => {
  //Create a shortcut for message.content
  const text: string = message.content;

  if (message.author.bot || !text.startsWith(`${PREFIX}`)) {
    return;
  }

  /**
   * !Temporary command for debugging purposes
   */
  if (message.content === "$join") {
    client.emit("guildMemberAdd", message.member as GuildMember);
  }

  //Separate the arguments after the command name
  const args: string[] = text.trim().slice(PREFIX?.length).trim().split(/ +/);

  const command: string = args.shift()!.toLowerCase();

  if (!commands.has(command)) {
    return;
  }

  try {
    commands.get(command)!.execute(message, args);
  } catch (error) {
    message.reply(
      "There was an error while trying to execute this command, please try again later."
    );
  }
});

/**
 *  When the bot is ready, setup the activity status
 */
client.once("ready", () => {
  const activity = `${PREFIX}help`;

  client.user?.setActivity(activity, {
    type: "LISTENING",
  });
});

/**
 *  When user joins the server
 */
client.on("guildMemberAdd", async (member) => {
  if (!member.guild) return;
  const guild = member.guild;

  /**
   * ID canal de servidor testes: 841825479937359932
   * ID welcome do servidor testes: 841825479937359935
   *
   * ID canal de servidor da COMPUTAÇÃO: 836374069985280032
   * ID welcome-and-notes da COMPUTAÇÃO: 836374070642999327
   */
  const channel: GuildChannel | undefined =
    guild.channels.cache.get("841825479937359935");

  console.log("Novo usuário detectado");
  console.log(`Nome de usuario: ${member.user.username}`);

  //Count the number of members in a server
  let membercount: GuildMemberManager = guild.members;

  // Do nothing if the channel wasn't found on this server
  if (!channel) return;

  console.log("Encontrei o canal solicitado!!");

  const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("New Server Member!")
    .setDescription(`Welcome, ${member.user.tag} to **${guild.name}!**`)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter(`You are the ${membercount}th member to join`);

  (channel as TextChannel)?.send(embed).catch((error) => console.log(error));
});

client
  .login(DISCORD_TOKEN)
  .catch((err) => console.log(`Error while trying to log in: \n` + err));
