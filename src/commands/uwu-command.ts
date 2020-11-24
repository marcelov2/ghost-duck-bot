import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";

export class UwuCommand extends BotCommand {

  constructor()   {
    super("uwu", `cada vez que alguien ponga "uwu"  (o algo parecido) en un mensaje voy a mandar un gif`)
  }

  shouldExec(message: Message): boolean {
    let matches = message.content.match(/^.*u+[ ]*w+[ ]*u+.*$/i);
    return  matches !== null
  }

  exec(message: Message) : void {
    message.channel.send("https://media.tenor.com/images/da03e7732c014219614dd7c03674f468/tenor.gif");
  }

};