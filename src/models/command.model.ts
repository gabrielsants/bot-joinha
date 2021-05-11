import { Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  invisible?: boolean;
  execute: (message: Message, args: string[]) => any;
}
