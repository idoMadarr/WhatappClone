exports.sendMessage = async (req, res, next) => {
  const socket = req.app.get('socket');
  const { clientId } = req.params;
  const { message } = req.body;
  console.log(clientId, '!');
  await socket.broadcast
    .to(clientId)
    .emit('message', `${message} from ${socket.id}`);
  res.status(200).json({ message: `Message send to ${clientId}` });
};
