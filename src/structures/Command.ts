import { CommandConfig } from "../typings/types";

export class Command {
    constructor(commandOptions: CommandConfig) {
        Object.assign(this, commandOptions);
    }
}
