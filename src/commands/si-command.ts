import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";

export class SiCommand extends BotCommand {

  constructor() {
    super("si");
  }

  shouldExec(message: Message): boolean {
    let matches = message.content.match(/^.*si\..*$/i);
    return  matches !== null;
  }

  exec(message: Message): void {
      message.channel.send("https://media3.giphy.com/media/10CZdH20xCxWk8/giphy.gif");
  }
};