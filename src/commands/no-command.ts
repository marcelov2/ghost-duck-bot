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
      message.channel.send("https://www.pausaparanerdices.com/wp-content/uploads/2016/05/Blade-Motoqueiro-Fantasma-e-Cavaleiro-da-Lua-no-Netflix448.gif");
  }
};