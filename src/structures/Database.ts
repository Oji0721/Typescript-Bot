import { connect, connection } from 'mongoose';
import 'dotenv/config';

export class Database {
    connection = null;

    connect() {
      if (process.env.mongooseConnectionString) {
        connect(process.env.mongooseConnectionString).then(() => console.log('Connected to database')).catch((err) => console.error(err));
        this.connection = connection;
      }
    }
}