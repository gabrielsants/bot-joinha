//Library
import { Collection } from "discord.js";
import fs from "fs";
import path from "path";

//Local library
import { Command } from "../models";

/**
 * Load all commands in the 'commands/' folder
 * and return a collection of commands.
 */
export function loadCommands() {
  const files = fs.readdirSync(path.join(__dirname, "../commands"));
  const commands = new Collection<string, Command>();
  const errored: string[] = [];

  files.forEach((file) => {
    const command = require(`../commands/${file}`) as Command;

    if (!command) errored.push(file);
    else commands.set(command.name, command);
  });

  if (errored.length >= 1) {
    console.log("Some commands have failed to load: %s", errored.toString);
  }

  return commands;
}
