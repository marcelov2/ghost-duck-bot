import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";
import { AwaCommand } from '../commands/awa-command'
import { CluesCommand } from "../commands/clues-command";
import { EweCommand } from '../commands/ewe-command';
import { IwiCommand } from '../commands/iwi-command';
import { GhostCommand } from '../commands/ghost-command';
import { HelpCommand } from '../commands/help-command';
import { NoCommand } from '../commands/no-command';
import { OwoCommand } from '../commands/owo-command';
import { SiCommand } from '../commands/si-command';
import { UwuCommand } from '../commands/uwu-command';
import { PhasmoDataService } from "../services/phasmo-data";

export class CommandManager {
  public readonly prefix: string;
  public readonly reactions: BotCommand[];
  public readonly prefixedCommands: BotCommand[];

  private readonly phasmoDataService: PhasmoDataService;

  constructor(prefix: string){
    this.prefix = prefix;

    this.phasmoDataService = new PhasmoDataService();

    this.prefixedCommands = [
      new HelpCommand(this),
      new GhostCommand(this.phasmoDataService),
      new CluesCommand(this.phasmoDataService),
    ];

    this.reactions = [
      new AwaCommand(),
      new EweCommand(),
      new IwiCommand(),
      new OwoCommand(),
      new UwuCommand(),
      new SiCommand(),
      new NoCommand()
    ];

  };

  public process(message: Message): void {
    if(message.author.bot) return;

    if (message.content.startsWith(this.prefix)) {
      message.content = message.content.substring(this.prefix.length);
      this.execCommandFor(message, this.prefixedCommands);
    } else {
      this.execCommandFor(message, this.reactions);
    }
  }

  public execCommandFor(message: Message, commands : BotCommand[]): void {
    for (let command of commands) {
      if(command.shouldExec(message)){
        command.exec(message);
        break;
      }
    }
  }
}