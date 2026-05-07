import dotenv from "dotenv";
dotenv.config();

export interface Config {
    app_port: number,
    db_url: string,
    db_user: string,
    db_host: string,
    db_port: number,
    db_name: string,
    db_pass: string,
    nodeEnv:string,
    redis_pass: string
}

 const config:Config = {
    app_port: Number(process.env.PORT) || 8000,
    db_url: process.env.DATABASE_URL || "",

    db_user: process.env.DB_USER || "",
    db_host: process.env.DB_URL || "",
    db_port: Number(process.env.DB_PORT),
    db_name: process.env.DB_NAME || "",
    db_pass: process.env.DB_PASS || "",
    nodeEnv: process.env.NODE_ENV,
    redis_pass: process.env.REDIS_PASS
}

export default config;
