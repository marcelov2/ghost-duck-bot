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
      'https://gph.is/g/E1XMGr3',
      'https://gph.is/g/4LX8x0L',
      'https://gph.is/g/Z2KM1yA',
      'https://gph.is/g/4wW9glD',
      'https://gph.is/g/EvWnd25',
      'https://gph.is/g/4oW9wwK',
      'https://gph.is/g/4gwmB1J',
      'https://gph.is/g/apW9Vbx',
      'https://gph.is/g/Z7jMDWw',
      'https://gph.is/g/E1XMmgR',

	    
	];


    message.channel.send(rando_imgs[Math.floor(Math.random() * rando_imgs.length)]);
  }
}
