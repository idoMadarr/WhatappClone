const redis = require('redis');

let client;

const redisConnect = async port => {
  client = redis.createClient(port);
  await client.connect();
  console.log(client, 'client!');
};

module.exports = {
  init: redisConnect,
  redis: () => {
    if (!client) {
      throw new Error('Redis is not initialized!');
    }
    return client;
  },
};
