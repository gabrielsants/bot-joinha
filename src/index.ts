//Library files
import { Client } from "discord.js";
import { config } from "dotenv";
import { loadCommands } from "./utils/load-commands";

//Local files
config();
const { PREFIX, DISCORD_TOKEN } = process.env;

export const client: Client = new Client();
export const commands = loadCommands();

client.on("message", async (message) => {
  //Create a shortcut for message.content
  const text: string = message.content;

  if (message.author.bot || !text.startsWith(`${PREFIX}`)) {
    return;
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
client.on("ready", () => {
  const activity = `${PREFIX}help`;

  client.user?.setActivity(activity, {
    type: "LISTENING",
  });
});

client
  .login(DISCORD_TOKEN)
  .catch((err) => console.log(`Error while trying to log in: \n` + err));
