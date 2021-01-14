import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";

export class UwuCommand extends BotCommand {

  constructor()   {
    super("uwu");
  }

  shouldExec(message: Message): boolean {
    let matches = message.content.match(/^.*u+[ ]*w+[ ]*u+.*$/i);
    return  matches !== null
  }

  exec(message: Message) : void {
    message.channel.send("https://i.pinimg.com/originals/38/ce/bf/38cebf7e0d32383cc81a797ddb7a5d40.gif");
  }

};