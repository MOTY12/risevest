import { Client } from 'pg';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } from '@config';

const client = new Client({
  connectionString: `postgres://iwhlqihm:UQKtO8Y2sgZYMZ6yXq2PCjKbF7uGCEvV@silly.db.elephantsql.com/iwhlqihm`
  // postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
});



export default client;