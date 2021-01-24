import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";

export class EweCommand extends BotCommand {

  constructor()   {
    super("desafio", [])
  }

  shouldExec(message: Message): boolean {
    return message.content.startsWith(this.name);
  }

  async exec(message: Message): Promise<void> {
    let args = message.content.split(" ").map((argument) => argument.toLowerCase());
    args.shift();

    const rando_imgs = [
    'https://gph.is/g/am1M7kj',
    'https://gph.is/g/ZWgPVXd',
    'https://gph.is/g/4oW8Wk1',
	];


    message.channel.send(rando_imgs[Math.floor(Math.random() * rando_imgs.length)]);
  }
}
