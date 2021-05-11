import { Command } from "../models";
import { loadCommands } from "../utils/load-commands";
import { generateMessageEmbed } from "../utils/rich-embed";

module.exports = {
  name: "help",
  description: "show all commands",
  execute: (message, args) => {
    const commands = loadCommands();
    const embed = generateMessageEmbed("List of commands", message.client);

    commands
      .filter((command) => !command.invisible)
      .forEach((command) => embed.addField(command.name, command.description));

    message.channel.send(embed);
  },
} as Command;
