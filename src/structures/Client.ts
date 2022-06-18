import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection
} from "discord.js";
import { CommandConfig } from "../typings/types";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/types";
import { Event } from "./Event";
import { config } from '../config'
import { Database } from "./Database";
import 'dotenv/config';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands: Collection<string, CommandConfig> = new Collection();
    config = config;
    owners = config.owners;

    constructor() {
        super({ intents: 131071  });
    }

    start() {
        this.registerModules();
        this.login(process.env.botToken);
        new Database().connect();
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}/../commands/**/*{.ts,.js}`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandConfig = await this.importFile(filePath);
            if (!command.name) return;
            switch (command?.type) {
              case 'ChatInput' : command.type = 1;
                break;
              case 'User' : command.type = 2;
                break;
              case 'Message' : command.type = 3;
                break;
            };
            if (command.options) {
              for (const options of command?.options.values()) {
                switch (options.type) {
                  case 'Subcommand' : options.type = 1;
                    break;
                  case 'SubcommandGroup' : options.type = 2;
                    break;
                  case 'String' : options.type = 3;
                    break;
                  case 'Integer' : options.type = 4;
                    break;
                  case 'Boolean' : options.type = 5;
                    break;
                  case 'User' : options.type = 6;
                    break;
                  case 'Channel' : options.type = 7;
                    break;
                  case 'Role' : options.type = 8;
                    break;
                  case 'Mentionable' : options.type = 9;
                    break;
                  case 'Number' : options.type = 10;
                    break;
                  case 'Attachment' : options.type = 11;
                    break;
                }
              }
            };
            console.log(command);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.guildId
            });
        });

        // Event
        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );
          eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);
        });
    }
}
