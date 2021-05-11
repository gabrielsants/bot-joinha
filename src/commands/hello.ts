import { Command } from "../models";

module.exports = {
  name: "hello",
  description: "say hi to the sender",
  execute: (message, args) => {
    message.reply("Hi 🖐");
  },
} as Command;
