const { createClient } = require('redis');
let client;

const initRedis = async () => {
    if (!client) {
        // client = createClient({ url: 'redis://127.0.0.1:6379' });
        client = createClient({ url: 'redis://redis:6379' });
        client.on('connect', () => {
            console.log('Redis client connected');
        });
        client.on('error', (err) => {
            console.error('Error in Redis connection', err);
        });
    }
    try {
        await client.connect();
    } catch (err) {
        console.error('Error in Redis connection', err);
    }
};

module.exports = { initRedis, getClient: () => client };