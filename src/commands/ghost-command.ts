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

    if(args.length < 2) message.reply('tenés que decirme qué fantasma querés ');
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
      .setFooter('Tu vieja es tan fea que la usaron de referencia para los fantasmas de phasmophobia', 'https://store-images.s-microsoft.com/image/apps.10672.14459324830184757.115b4ae2-cd13-432d-afb1-065cbec4bc76.dda75efc-b359-434e-8a3a-c986f1ccbc23?mode=scale&q=90&h=270&w=270&background=%23FFFFFF');

    return message;
  }

};