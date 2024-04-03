import pkg from 'pg';
import { Database_Password } from '../config/enviroments.js';
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  password: Database_Password,
  host: "localhost",
  port: 5000,
  database: "Banco_Data",
});
