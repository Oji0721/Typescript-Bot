declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildId: string;
            mongooseConnectionString: string;
        }
    }
}

export {};
