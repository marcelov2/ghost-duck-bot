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
      'https://gph.is/g/ajwG0Vn',
      'https://gph.is/g/ZPG9MXp',
      'https://gph.is/g/4bGzr13',
      'https://gph.is/g/Z8oQmzA',
      'https://gph.is/g/ZkkdGV8',
      'https://gph.is/g/4oWAYNe',
      'https://gph.is/g/aXVzdWA',
      'https://gph.is/g/4oWAYRD',
      'https://gph.is/g/aKQOV5q',
      'https://gph.is/g/4wWLVJj',
      'https://gph.is/g/ZO0yMDg',
      'https://gph.is/g/ZrWqopd',
      'https://gph.is/g/ZkkdXMB',
      'https://gph.is/g/am1oq9k',

	    
	];


    message.channel.send(rando_imgs[Math.floor(Math.random() * rando_imgs.length)]);
  }
}
