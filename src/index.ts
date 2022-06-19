import("dotenv/config");
import { ExtendedClient } from "./structures/Client";
import { Database } from './structures/types';

export const client = new ExtendedClient();
export const db = new Database();

client.start();
db.start();
