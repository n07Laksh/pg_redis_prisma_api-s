import { createClient } from "redis";
import config from "./env_config";

// const client = createClient({
//   username: 'default',
//   password: config.redis_pass,
//   socket: {
//     host: 'redis-10546.crce206.ap-south-1-1.ec2.cloud.redislabs.com',
//     port: 10546
//   }
// });
const client = createClient();


export const connectRedis = async () => {
  await client.connect();
};

client.on("error",(err)=>{
  console.error("redis client error: ", err)
})

export default client;