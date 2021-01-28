import { Message } from "discord.js";
import { BotCommand } from "../abstracts/bot-command";

export class AwaCommand extends BotCommand {

  constructor()   {
    super("mapa",[])
  }

  shouldExec(message: Message): boolean {
    return message.content.startsWith(this.name);
  }

  async exec(message: Message): Promise<void> {
    let args = message.content.split(" ").map((argument) => argument.toLowerCase());
    args.shift();

    const rando_imgs = [
    'https://gph.is/g/aRjB6gO',
    'https://gph.is/g/aXVQkJR',
    'https://gph.is/g/apW91QB',
    'https://gph.is/g/a9RMYeP',
    'https://gph.is/g/ZPGBgXl',
    'https://gph.is/g/EGnD7NJ',
    'https://gph.is/g/4oW9MMK',
    'https://gph.is/g/a9RMYYJ',
    
    
	];


    message.channel.send(rando_imgs[Math.floor(Math.random() * rando_imgs.length)]);
  }
}
