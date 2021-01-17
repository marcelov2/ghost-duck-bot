import { BotCommand } from '../abstracts/bot-command';
import { PhasmoDataService } from '../services/phasmo-data';
import { StringFormatter } from '../helpers/string-formatter'
import { Message, MessageEmbed } from 'discord.js';
import { GhostType } from '../interfaces/ghost-type';

export class CluesCommand extends BotCommand {

  private readonly phasmoDataService: PhasmoDataService;

  constructor(phasmoDataService: PhasmoDataService) {
    super("evi",
    ["Dado um conjunto de evidências separadas por espaço, direi todos os tipos possíveis de fantasmas com os quais você poderia estar lidando. A evidência pode ser qualquer uma das seguintes, você pode usar seu nome curto (que é mostrado entre parênteses):"],
    ['evi_list']);

    this.phasmoDataService = phasmoDataService;

    this.addEvidenceToDescription();

  }

  async addEvidenceToDescription(): Promise<void> {
    let posibleEvidence = await this.phasmoDataService.getAllEvidence();
    for(let evidence of posibleEvidence) {
      let evidenceName = StringFormatter.format(evidence.name, ['capitalize']);
      let evidenceShort =  StringFormatter.format(evidence.short_name, ['italic']);;
      this.addLineToDescription(`\t* ${evidenceName} (${evidenceShort})`);
    }
  };

  shouldExec(message: Message): boolean {
    return message.content.startsWith(this.name);
  }

  async exec(message: Message): Promise<void> {
    let args = message.content.split(" ").map((argument) => argument.toLowerCase());
    args.shift();

    if (args.length === 0) {
      message.channel.send('Vá em frente, criatura, receba uma dica (ou melhor, duas) antes de pedir ajuda.  ')
    } else if(args.length === 1) {
      message.channel.send('Bem, apenas uma pista? sou um bot e nao um Xamã.','https://i.pinimg.com/originals/9f/47/48/9f47487e412947f654b8036666ad0473.gif');
      this.replyWithoutAdvice(message, args[0]);
    } else {
      this.replyWithAdvice(message, args);
    }
  }

  private async replyWithAdvice(message: Message, evidence: string[]) {
    let posibleGhosts = await this.phasmoDataService.getGhostAdviceFromEvidence(evidence)
    let missingEvidence = await this.getMissingEvidenceFor(posibleGhosts, evidence);
    let renderedMessage = this.renderAdvidceMessage(posibleGhosts, missingEvidence);
    message.channel.send(renderedMessage);
  }

  private async replyWithoutAdvice(message: Message, evidence: string) {
    let posibleGhosts = await this.phasmoDataService.getGhostNameFromEvidenceShortName(evidence);
    let evidences = await this.getMissingEvidenceFor(posibleGhosts, [evidence]);
    let renderedMessage = this.renderSimpleListEmbed(posibleGhosts, evidences);
    message.channel.send(renderedMessage);
    /*let missingClues = await this.phasmoDataService.getEvidenceeee
    message.channel.send(JSON.stringify(posibleGhost));*/
  }

  private async getMissingEvidenceFor(ghosts: GhostType[], evidence: string[]){
    let evidencePromises: Promise<string[]>[] = [];

    for(let ghostType of ghosts) {
      let evidencePromise = this.phasmoDataService.getEvidenceNamesOfIdExceptFor(ghostType.id, evidence);
      evidencePromises.push(evidencePromise);
    }

    return await Promise.all(evidencePromises);
  }

  private renderSimpleListEmbed(ghosts: GhostType[], evidences: string[][]): MessageEmbed {
    let message = new MessageEmbed().setColor('#666666')
      .setTitle('Aqui você tem uma lista do que poderia ser :Dancing:')
      .addFields([
        { name: "Fantasma", value:'\u200b', inline: true},
        { name: "Evidência ausente 0", value:'\u200b', inline: true},
        { name: "Evidência ausente 1", value:'\u200b', inline: true},
      ]);

    ghosts.forEach((ghost, index) => {
      const data = this.getFormatedMissingEvidence(ghost, evidences[index], index);

      message.addFields([
        { name: '\u200b', value: data[0], inline: true},
        { name: '\u200b', value: data[1][0], inline: true},
        { name: '\u200b', value: data[1][1], inline: true},
      ]);
    });

    return message;
  }

  private renderAdvidceMessage(ghosts: GhostType[], evidences: string[][]): MessageEmbed {
    let message = new MessageEmbed().setColor('#666666')
      .setTitle('Possiveis Fantasmas')
      .setDescription('Dadas as pistas que você me deu, o fantasma pode ser um dos seguintes:')

    ghosts.forEach((ghost, index) => {

      let formattedEvidence = evidences[index].map((evidence) => StringFormatter.format(evidence, ['capitalize']));
      if(formattedEvidence.length === 0) formattedEvidence=["None"];

      message.addFields([
        { name: ghost.name.toUpperCase(), value: ghost.advice},
        { name: 'Evidência ausente', value: formattedEvidence, inline: true},
      ]);
    });

    return message;
  }

  private getFormatedMissingEvidence(ghost: GhostType, evidences: string[], index: number): any[] {
    let format = ['capitalize', 'italic'];
    if(index % 2 == 1) format.push('bold');

    let ghostName =  StringFormatter.format(ghost.name, format);
    let capitalizedEvidence = evidences.map((evidence) => StringFormatter.format(evidence, format));
    return [ghostName, capitalizedEvidence]
  }

}
