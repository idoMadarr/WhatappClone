const UserModule = require('../modules/UserModule');
const jwt = require('jsonwebtoken');
const Message = require('../modules/Message');

const isAuth = async (req, res, next) => {
  const token = req.header('Authentication').split(' ')[1];

  if (!token) {
    const message = new Message('Token not found', 401);
    return res.status(401).json(message);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECERT);
    req.currentUser = await UserModule.findById({ _id: decoded.id });
    next();
  } catch (error) {
    const message = new Message('Invalid Token', 401);
    return res.status(401).json(message);
  }
};

module.exports = isAuth;
