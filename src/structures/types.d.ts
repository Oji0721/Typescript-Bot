import {
    ApplicationCommandDataResolvable,
    ChannelType,
    ChatInputCommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable
} from 'discord.js';
import { ExtendedClient } from './Client';

export interface BotConfig {
  /**
  * @default !
  */
  prefix: string;
  owners?: string[];
}

export interface RegisterCommandsOptions {
    guildId?: string;
    commands: ApplicationCommandDataResolvable[];
}

export interface ExtendedInteraction extends ChatInputCommandInteraction {
    client: ExtendedClient;
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

type CommandArgs = {
    name: string;
    value: string | number
}

type CommandOptions = {
    /**
    * @default String
    */
    type?: 'Subcommand' | 'SubcommandGroup' | 'String' | 'Integer' | 'Boolean' | 'User' | 'Channel' | 'Role' | 'Mentionable' | 'Number' | 'Attachment' | number;
    name: string;
    description: string;
    /**
    * @default false
    */
    autocomplete?: boolean;
    /**
    * @default false
    */
    required?: boolean;
    choices?: CommandArgs[];
    options?: CommandOptions[];
    channelTypes?: ChannelType[];
    minValue?: number;
    maxValue?: number;
}

export type CommandConfig = {
    name: string;
    description: string;
    /**
    * @default ChatInput
    */
    type?: 'ChatInput' | 'User' | 'Message' | number;
    options?: CommandOptions[];
    /**
    * @default SendMessages
    */
    defaultMemberPermissions?: PermissionResolvable;
    /**
    * @default false
    */
    dmPermission?: boolean;
    run: RunFunction
}
