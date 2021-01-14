import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";

export class IwiCommand extends BotCommand {

  constructor()   {
    super("iwi", [])
  }

  shouldExec(message: Message): boolean {
    let matches = message.content.match(/^.*i+[ ]*w+[ ]*i+.*$/i);
    return  matches !== null
  }

  exec(message: Message) : void {
    message.channel.send("https://s2.glbimg.com/8caHzU0yVq7Rk-E5v9WjuRxIi-Y=/smart/e.glbimg.com/og/ed/f/original/2015/10/30/babadook.gif");
  }

};