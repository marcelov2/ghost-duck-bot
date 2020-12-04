import { BotCommand } from '../abstracts/bot-command';
import { PhasmoDataService } from '../services/phasmo-data';
import { StringFormatter } from '../helpers/string-formatter'
import { Message, MessageEmbed } from 'discord.js';
import { GhostType } from '../interfaces/ghost-type';

export class CluesCommand extends BotCommand {

  private readonly phasmoDataService: PhasmoDataService;

  constructor(phasmoDataService: PhasmoDataService) {
    super("clues",
    ["Given a space separated set of evidences, I will tell you all possible ghost types that you could be dealing with. The evidence can be any of the following, you may use its short name (which is shown between paranthesis):"],
    ['clue_list']);

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
      message.channel.send('Dale, forro, conseguí una pista (o mejor dos) antes de pedirme ayuda.')
    } else if(args.length === 1) {
      message.channel.send('Bueh, una pista nomas?');
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
      .setTitle('Aca tenes una lista de lo que podria ser :rolling_eyes:')
      .addFields([
        { name: "Ghost", value:'\u200b', inline: true},
        { name: "Missing Evidence 0", value:'\u200b', inline: true},
        { name: "Missing Evidence 1", value:'\u200b', inline: true},
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
      .setTitle('Posibles ghosts')
      .setDescription('Given the clues you gave me, the ghost can be one of the following:')

    ghosts.forEach((ghost, index) => {

      let formattedEvidence = evidences[index].map((evidence) => StringFormatter.format(evidence, ['capitalize']));
      if(formattedEvidence.length === 0) formattedEvidence=["None"];

      message.addFields([
        { name: ghost.name.toUpperCase(), value: ghost.advice},
        { name: 'Missing Evidence', value: formattedEvidence, inline: true},
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
