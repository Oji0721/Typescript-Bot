import { CommandConfig } from "./types";

export class Command {
    constructor(commandOptions: CommandConfig) {
        Object.assign(this, commandOptions);
    }
}
