const UserModule = require('../modules/UserModule');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyCheck = require('../utils/bodyCheck');
const Message = require('../modules/Message');

exports.signUp = async (req, res, _next) => {
  const bodyValidation = bodyCheck(req, res);
  if (bodyValidation === false) return;

  const { username, email, password, gender, country, city, phone, isAdmin } =
    req.body;

  const existsUser = await UserModule.findOne({ email });
  if (existsUser) {
    const message = new Message('User already exists', 403);
    return res.status(403).json(message);
  }

  const hashPassword = await bcryptjs.hash(password, 12);
  const user = await UserModule({
    username,
    email,
    gender,
    country,
    city,
    phone,
    isAdmin,
    password: hashPassword,
  });
  await user.save();

  const identifier = { id: user._id };
  jwt.sign(identifier, process.env.SECERT, (_error, token) =>
    res.status(200).json({ token, username })
  );
};

exports.signIn = async (req, res, _next) => {
  const bodyValidation = bodyCheck(req, res);
  if (bodyValidation === false) return;

  const { email, password } = req.body;
  const message = new Message('Please check your email and password', 401);

  const userExist = await UserModule.findOne({ email });
  if (!userExist) return res.status(401).json(message);

  const isMatch = await bcryptjs.compare(password, userExist.password);
  if (!isMatch) return res.status(401).json(message);

  const identifier = { id: userExist._id };
  jwt.sign(identifier, process.env.SECERT, (_error, token) => {
    res.status(200).json({ token, username: userExist.username });
  });
};
