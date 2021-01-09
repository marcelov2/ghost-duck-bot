import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";

export class NoCommand extends BotCommand {

  constructor() {
    super("no");
  }

  shouldExec(message: Message): boolean {
    let matches = message.content.match(/^.*no\..*$/i);
    return  matches !== null;
  }

  exec(message: Message): void {
      message.channel.send("https://media1.tenor.com/images/4fa3a2b2ccdb4d629b065ac2b62a86f0/tenor.gif");
  }
};