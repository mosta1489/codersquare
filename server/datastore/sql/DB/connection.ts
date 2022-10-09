import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const DB = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: Number(process.env.PORT_DATA),
});

export default DB;
