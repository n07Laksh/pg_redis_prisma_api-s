import express from "express";
import config from "./config/env_config";
import pool from "./config/pg_config";
import { connectRedis } from "./config/redis_config";
import { prisma } from "./config/prisma_db_config";
import { errorHandler } from "./middleware/error_handler";
import auth from "./Routes/example_route"
import redis from "./Routes/redis_example";
import cars from "./Routes/postgres_example"
import users from "./Routes/prisma_example"

const app = express();

// REDIS CONNECTION FUNCTION CALL
connectRedis();

// BODY PARSER MIDDLEWARE
app.use(express.json());


app.use("/auth", auth)
app.use("/redis/users", redis)
app.use("/pg", cars)
app.use("/pm", users)


// GLOBAL ROUTE
app.use((req, res) => {
  res.json({ msg: "response from global route" })
});


// ERROR HANDLER MIDDLEWARE CALL
app.use(errorHandler)


app.listen(config.app_port, () => {
  console.log(`app running in http://localhost:${config.app_port}`)
});

// CLOSE CONNECTIONS WHEN SERVER SHUT DOWN
process.on("SIGINT", async ()=>{
  console.log("Sutting Down...");
  await pool.end();
  process.exit(0)
});