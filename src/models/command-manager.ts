import { Message } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";
import { HelpCommand } from '../commands/help-command'
import { GhostCommand } from '../commands/ghost-command'
import { AwaCommand } from '../commands/awa-command'
import { OwoCommand } from '../commands/owo-command'
import { UwuCommand } from '../commands/uwu-command'

export class CommandManager {
  private readonly prefix: string;

  private reactions: BotCommand[] = [
    new AwaCommand(),
    new OwoCommand(),
    new UwuCommand()
  ];

  private prefixedCommands: BotCommand[] = [
    new GhostCommand()
  ];

  constructor(prefix: string){
    this.prefix = prefix;
    this.generateHelpCommand();
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

  private generateHelpCommand(): void {

    let helpCommand = new HelpCommand(this.prefix, this.prefixedCommands, this.reactions)
    this.prefixedCommands.push(helpCommand);

  }

}