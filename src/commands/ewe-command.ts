import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";

export class EweCommand extends BotCommand {

  constructor()   {
    super("ewe", [])
  }

  shouldExec(message: Message): boolean {
    let matches = message.content.match(/^.*e+[ ]*w+[ ]*e+.*$/i);
    return  matches !== null
  }

  exec(message: Message) : void {
    message.channel.send("https://www.rajnikantvscidjokes.in/wp-content/uploads/2015/07/841039.gif");
  }

};