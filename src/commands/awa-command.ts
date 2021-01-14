import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";

export class AwaCommand extends BotCommand {

  constructor()   {
    super("awa", [])
  }

  shouldExec(message: Message): boolean {
    let matches = message.content.match(/^.*a+[ ]*w+[ ]*a+.*$/i);
    return  matches !== null
  }

  exec(message: Message) : void {
    message.channel.send("https://i.gifer.com/kgY.gif");
  }

};