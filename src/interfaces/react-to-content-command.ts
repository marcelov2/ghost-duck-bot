import { BotCommand } from "./bot-command";

export interface ReactToContentCommand extends BotCommand {
  pattern: RegExp; 
}