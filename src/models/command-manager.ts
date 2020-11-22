import { Message } from "discord.js";

import { reactToContentCommands, prefixedCommands } from "../commands/command-list";
import { BotCommand } from "../interfaces/bot-command";
import { ReactToContentCommand } from "../interfaces/react-to-content-command";

export class CommandManager {
    private readonly prefix: string;
    private reactToContentCommands: ReactToContentCommand[] = reactToContentCommands;
    private prefixedCommands: BotCommand[] = prefixedCommands;

    constructor(prefix: string){
        this.prefix = prefix;
        this.generateHelpCommand();

    };

    public process(message: Message): void {
        if (message.content.startsWith(this.prefix)) {
            message.content = message.content.substring(this.prefix.length);
            this.execPrefixedCommand(message);
        } else {
            this.execReactToContentCommand(message);
        }
    }

    public execPrefixedCommand(message: Message): void {
        for (let command of this.prefixedCommands) {
            if (message.content === command.name) {
                command.exec(message);    
            }
        }
    }

    public execReactToContentCommand(message: Message): void {
        for (let command of this.reactToContentCommands) {
            if (message.content.match(command.pattern)) {
                command.exec(message);
            }
        }
    }

    private generateHelpCommand(): void {
        let help: BotCommand = {
            name: 'help',
            description: "Te muestro lo que puedo hacer",
            exec: function (_msg: Message) { } 
        }

        this.prefixedCommands.push(help);

        let helpMessage = `podes usar los siguientes comandos, si cuando escribis les pones adelante un "${this.prefix}":\n`;
        helpMessage = this.concatCommandsToHelpMessage(this.prefixedCommands, helpMessage);
        helpMessage = helpMessage.concat(`\nAdemás, tengo las siguientes reacciones:\n`);
        helpMessage = this.concatCommandsToHelpMessage(this.reactToContentCommands, helpMessage);
        
        help.exec = (message: Message) => {
                message.reply(helpMessage);
        }

    }

    private concatCommandsToHelpMessage(commandList: BotCommand[], helpMessage: string): string {
        for (let command of commandList) {
            helpMessage = helpMessage.concat(`\t**${command.name}**:\t${command.description}\n`);
        }
        return helpMessage;
    }
    
}