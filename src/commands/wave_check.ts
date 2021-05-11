import { Command } from "../models";

module.exports = {
  name: "wave",
  description: "checks if you got the waves",
  execute: (message, args) => {
    message.channel.send("Broo, u got da waves 🥶🥶");
  },
} as Command;
