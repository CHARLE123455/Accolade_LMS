
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_HOST_PORT || 6379}`
  });


  redisClient.on('error', (error) => console.error('Redis Client Error', error));

  const connectRedis = async () => {
    try {
      await redisClient.connect();
      console.log('Redis connected');
    } catch (error) {
      console.error('Redis connection error:', error);
    }
  };
  
  export { redisClient, connectRedis };