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
    'https://gph.is/g/E3LpyGO',
    'https://gph.is/g/aeoWg28',
    'https://gph.is/g/EvWp5gg',
    'https://gph.is/g/Z5GJXjD',
    'https://gph.is/g/ZPGqdrd',
    'https://gph.is/g/EqW0g2x',
    'https://gph.is/g/aXVLlgP',
	];


    message.channel.send(rando_imgs[Math.floor(Math.random() * rando_imgs.length)]);
  }
}
