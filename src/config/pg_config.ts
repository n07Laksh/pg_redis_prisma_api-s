import { Client, Pool, PoolConfig } from "pg";
import config from "./env_config";

const poolConfig:PoolConfig = {
    user:config.db_user,
    host: config.db_host,
    database: config.db_name,
    password: config.db_pass,
    port: config.db_port
}

const pool = new Pool(poolConfig)

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected!");
    client.release();
  } catch (err) {
    console.error("Connection failed:", err);
  }
};
testConnection();

export const getClient = () => pool.connect();
export default pool;