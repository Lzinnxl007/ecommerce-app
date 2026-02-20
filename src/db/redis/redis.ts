import { createClient } from 'redis';

const redis = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-14514.crce207.sa-east-1-2.ec2.cloud.redislabs.com',
        port: 14514
    }
});

redis.on('error', err => console.log('Redis Client Error', err));

await redis.connect();

export { redis }

