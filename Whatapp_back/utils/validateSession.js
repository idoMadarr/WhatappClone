const client = require('../services/redis');
const { jsonParser } = require('./jsonParser');
const { getIO } = require('../services/socket');

exports.validateSession = async (req, res, next) => {
  const { email, clientId } = req.body;

  const clients = await client.lRange('clients', 0, -1);
  let clientsList = jsonParser(clients);

  const onlineUser = clientsList.find(user => user.email === email);

  if (onlineUser) {
    console.log(clientsList, 'all clients');
    console.log(onlineUser.clientId, 'sho logout this client');
    getIO().to(onlineUser.clientId).emit('sessionTimeout', email);
  } else {
    let clientMatch = clientsList.find(client => client.clientId === clientId);
    const clientMatchIndex = clientsList.findIndex(
      client => client.clientId === clientId
    );
    clientMatch.email = email;

    await client.lSet('clients', clientMatchIndex, JSON.stringify(clientMatch));
  }
  next();
};
