import { Message } from "discord.js";

export interface BotCommand{
    name: string;
    description: string;
    exec: (message: Message) => void;
}