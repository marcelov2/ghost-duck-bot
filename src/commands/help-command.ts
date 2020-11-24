import { Message } from 'discord.js';

import { BotCommand } from '../abstracts/bot-command'

export class HelpCommand extends BotCommand {

  private helpText: string = '';

  constructor(prefix: string, prefixedCommands: BotCommand[], reactions: BotCommand[]) {
    super('help', 'Te muestro lo que puedo hacer')

    this.helpText = `podes usar los siguientes comandos, si cuando escribis les pones adelante un punto ("${prefix}"):\n`;
    this.addDescription(this);

    this.addDescriptionBatch(prefixedCommands);

    this.helpText = this.helpText.concat(`\nAdemás, tengo las siguientes reacciones:\n`);
    this.addDescriptionBatch(reactions);

  }

  shouldExec(message: Message): boolean {
    return message.content === this.name;
  }

  exec(message: Message): void {
    message.reply(this.helpText);
  }

  private addDescriptionBatch(commandList: BotCommand[]): void {
    for (let command of commandList) {
      let commandHelpText = `\t**${command.name}**`;

      if(command.parameters){
        let parameters = command.parameters?.map((parameter) => {
          return `*${parameter}*`
        }).join(' ');

        commandHelpText = `${commandHelpText} ${parameters}`;
      }

      commandHelpText = `${commandHelpText}: \n\t\t${command.description}\n`;
      this.helpText = this.helpText.concat(commandHelpText);
    }
  }

  private addDescription(command: BotCommand){
    this.helpText = this.helpText.concat(`\t**${command.name}**:\n\t\t${command.description}\n`)
  }
}