import { BotCommand } from '../interfaces/bot-command';
import { ReactToContentCommand } from '../interfaces/react-to-content-command';
import { OWO } from './react-to-content-commands/owo'
import { UWU } from './react-to-content-commands/uwu'

const reactToContentCommands: ReactToContentCommand[] = [OWO, UWU];
const prefixedCommands: BotCommand[] = [];

export { reactToContentCommands, prefixedCommands };    