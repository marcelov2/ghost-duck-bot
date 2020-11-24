import { Message } from "discord.js";

export abstract class BotCommand{

    private _name: string;
    private _description: string;
    private _parameters: string[] | undefined;

    constructor(name: string, description: string, parameters?: string[]) {
        this._name = name;
        this._description = description;
        this._parameters = parameters;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get parameters() {
        return this._parameters;
    }

    public abstract shouldExec(message: Message): boolean;
    public abstract exec(message: Message) : void;
}