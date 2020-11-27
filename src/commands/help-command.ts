import { Message } from 'discord.js';

import { BotCommand } from '../abstracts/bot-command'

export class HelpCommand extends BotCommand {

  private helpText: string = '';

  constructor(prefix: string, prefixedCommands: BotCommand[], reactions: BotCommand[]) {
    super('help', 'I will show you everything I can do')

    this.helpText = `you can use any of the following commands by prefixing a "${prefix}" before them:\n`;
    this.addDescription(this);

    this.addDescriptionBatch(prefixedCommands);

    this.helpText = this.helpText.concat(`\nI also can react to some of your messages with gifs if they contain some of the following strings (or similiar):\n`);
    this.addReactionBatch(reactions);

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
    this.helpText = this.helpText.concat(`\t**${command.name}**:\n\t\t${command.description}\n\n`);
  }

  private addReactionBatch(reactions: BotCommand[]){
    for(let reaction of reactions){
      this.helpText = this.helpText.concat(`\t\t* "${reaction.name}"\n`);
    }
  }
}