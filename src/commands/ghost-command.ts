import { Message, MessageEmbed } from "discord.js";

import { BotCommand } from "../abstracts/bot-command";
import { GhostType } from "../interfaces/ghost-type";
import { PhasmoDataService} from "../services/phasmo-data";

export class GhostCommand extends BotCommand {

  private phasmoDataService: PhasmoDataService;

  constructor(){
    super("ghost", `I will give you information about the ghost type *ghost_type* that could be useful during a phasmophobia ghost hunt`, ['ghost_type']);
    this.phasmoDataService = new PhasmoDataService();
  }

  shouldExec(message: Message): boolean {
    return message.content.startsWith(this.name);
  }

  async exec(message: Message): Promise<any> {
    let args = message.content.split(' ');

    if(args.length < 2) message.reply('tenés que decirme cual fantasma querés ');
    else {
      let ghostType = await this.phasmoDataService.getPhantomType(args[1].toLowerCase());
      let reply: string | MessageEmbed = "La cagaste amig@, no hay ningún fantasma que se llame asi";

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
      message.addField(`Evidence ${index}`,evidenceName.toUpperCase(),true);
    })

    message.addFields(
        { name: 'Strength', value: ghostType.strength },
        { name: 'Weakness', value: ghostType.weakness },
        { name: 'Details', value: ghostType.details},
      )
      .setFooter('Be careful and good hunt!', 'https://i.ibb.co/Mc7XYj0/Image001.png');

    return message;
  }

};