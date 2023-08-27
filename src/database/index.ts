import { Client } from 'pg';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } from '@config';

const client = new Client({
  connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
});



export default client;