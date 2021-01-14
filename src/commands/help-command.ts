import { Message } from 'discord.js';

import { BotCommand } from '../abstracts/bot-command'
import { StringFormatter } from '../helpers/string-formatter';
import { CommandManager } from '../models/command-manager';

export class HelpCommand extends BotCommand {

  private readonly commandManager: CommandManager;

  private helpText: string;

  constructor(commandManager: CommandManager) {
    super('help', ['Vou te mostrar tudo que posso fazer']);
    this.commandManager = commandManager;
    this.helpText=''
  }

  shouldExec(message: Message): boolean {
    return message.content === this.name;
  }

  exec(message: Message): void {
    this.helpText = StringFormatter.format('peça ajuda à sua velha', ['strikethrough']);
    this.helpText = `${this.helpText} você pode usar qualquer um dos seguintes comandos "${this.commandManager.prefix}" antes deles:\n`;
    this.addDescriptionBatch(this.commandManager.prefixedCommands);

    this.helpText = this.helpText.concat(`\nI também reage a algumas de suas mensagens enviando um GIF se elas contiverem algumas das seguintes strings (ou algo semelhante):\n`);
    this.addReactionBatch(this.commandManager.reactions);
    message.reply(this.helpText, {
      split: true
    });
  }

  private addDescriptionBatch(commandList: BotCommand[]): void {
    for (let command of commandList) {
      this.addDescription(command);
    }
  }

  private addDescription(command: BotCommand){
    let boldCommandName = StringFormatter.format(command.name, ['bold']);
    let commandHelpText = `\t${boldCommandName}`;

    if(command.parameters){
      let parameters = command.parameters?.map((parameter) => {
        return StringFormatter.format(parameter, ['italic']);
      }).join(' ');

      commandHelpText = commandHelpText.concat(`  ${parameters}`);
    }

    commandHelpText = commandHelpText.concat(`:\n`);
    commandHelpText = commandHelpText.concat(command.formattedDescription(2));

    this.helpText = this.helpText.concat(`${commandHelpText}\n`);
  }

  private addReactionBatch(reactions: BotCommand[]){
    for(let reaction of reactions){
      this.helpText = this.helpText.concat(`\t\t* "${reaction.name}"\n`);
    }
  }
}