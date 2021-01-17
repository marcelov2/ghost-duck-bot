import { Message, MessageEmbed } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";
import { StringFormatter } from "../helpers/string-formatter";
import { GhostType } from "../interfaces/ghost-type";
import { PhasmoDataService} from "../services/phasmo-data";

export class GhostCommand extends BotCommand {

  private phasmoDataService: PhasmoDataService;

  constructor(phasmoDataService: PhasmoDataService) {
    super("fan", [`Vou lhe dar informações sobre o tipo de fantasma *fan_type* que pode ser útil durante uma caça a fantasmas por phasmofobia`], ['fan_type']);

    this.phasmoDataService = phasmoDataService;
    this.addLineToDescription("Estes são os tipos de fantasmas que conheço:");
    this.addGhostTypeToDescription();

  }

  async addGhostTypeToDescription(): Promise<void> {
      let ghostTypes = await this.phasmoDataService.getAllGhostTypes();
      let newLine = '\t ';
      ghostTypes.forEach((type, index) => {
        let italicName = StringFormatter.format(type.name, ['italic']);
        newLine = newLine.concat(italicName);

        let separator = ', ';
        if(index == ghostTypes.length - 1){
          separator = '.';
        }

        newLine = newLine.concat(separator);

      })

      this.addLineToDescription(newLine);
  }

  shouldExec(message: Message): boolean {
    return message.content.startsWith(this.name);
  }

  async exec(message: Message): Promise<any> {
    let args = message.content.split(' ');
    let reply: string | MessageEmbed = 'Você tem que me dizer sobre qual tipo de fantasma que você precisa de informações';

    if(args.length < 2) {
      message.reply('você tem que me dizer que  fantasma você quer ');
    } else {
      let ghostType = await this.phasmoDataService.getPhantomType(args[1].toLowerCase());
      reply = "Você estragou tudo meu amigo, não existe fantasma com esse nome, vá estudar";

      if(ghostType){
        let ghostEvidence = await this.phasmoDataService.getEvidenceNamesOf(ghostType?.name);
        reply = this.generateEmbedFor(ghostType, ghostEvidence);
      }

      message.channel.send(reply);
    }
  }

  private generateEmbedFor(ghostType: GhostType, evidenceNames: string[]): MessageEmbed {
    let name = ghostType.name.toUpperCase();

    let message = new MessageEmbed().setColor('#666666')
      .setTitle(name);

    evidenceNames.forEach( (evidenceName, index) => {
      let capitalizedEvidence = StringFormatter.format(evidenceName, ['capitalize']);
      message.addField(`Evidence ${index}`, capitalizedEvidence, true);
    })

    message.addFields(
        { name: 'Força', value: ghostType.strength },
        { name: 'Fraqueza', value: ghostType.weakness },
        { name: 'Detalhes', value: ghostType.details},
      )
      .setFooter('Sua velha é tão feia que a usaram como referência para os fantasmas da phasmofobia');

    return message;
  }

};
