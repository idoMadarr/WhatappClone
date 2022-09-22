// Main
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Modules
const UserModule = require('../modules/UserModule');
const OnlineModule = require('../modules/OnlineModule');
const Message = require('../modules/Message');

// Services
const transporter = require('../services/nodemailer');
const { getIO } = require('../services/socket');
const client = require('../services/redis');

// Utils
const bodyCheck = require('../utils/bodyCheck');
const generateCodeVerification = require('../utils/codeVerification');

// Action Types
const { ACTIVATION_REQUIRED } = require('../constants/actionTypes.json');

exports.signUp = async (req, res, _next) => {
  const bodyValidation = bodyCheck(req, res);
  if (bodyValidation === false) return;

  const { username, email, password, country, city, phone, isAdmin, clientId } =
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
    country,
    city,
    phone,
    isAdmin,
    password: hashPassword,
  });
  await user.save();

  const identifier = { id: user._id };
  jwt.sign(identifier, process.env.SECERT, async (_error, token) => {
    const setActive = await OnlineModule({ email, clientId, online: true });
    await setActive.save();
    res.status(200).json({ token, username, activated: false, email });
  });
};

exports.signIn = async (req, res, _next) => {
  const bodyValidation = bodyCheck(req, res);
  if (bodyValidation === false) return;

  const { email, password, clientId } = req.body;
  const socket = req.app.get('socket');
  const message = new Message('Please check your email and password', 401);

  const userExist = await UserModule.findOne({ email });
  if (!userExist) return res.status(401).json(message);

  const isMatch = await bcryptjs.compare(password, userExist.password);
  if (!isMatch) return res.status(401).json(message);

  if (!userExist.activated) {
    const activationMessage = new Message(
      'Make sure to activate your account',
      401,
      { require: ACTIVATION_REQUIRED, user: email, press: 'Active' }
    );
    return res.status(401).json(activationMessage);
  }

  // const userOnline = await OnlineModule.findOne({ email });

  // if (userOnline) {
  //   console.log(userOnline, 'userOnline');
  //   // await OnlineModule.findOneAndUpdate(
  //   //   { clientId: userOnline.clientId },
  //   //   { clientId: clientId }
  //   // );
  //   await socket.broadcast
  //     .to(userOnline.clientId)
  //     .emit('session_timeout', email);
  // } else {
  //   const setActive = await OnlineModule({ email, clientId, online: true });
  //   await setActive.save();
  // }

  const identifier = { id: userExist._id };
  jwt.sign(identifier, process.env.SECERT, async (_error, token) => {
    getIO().emit('user', {
      email,
      clientId,
      message: `${email} has logged in`,
    });
    res
      .status(200)
      .json({ token, username: userExist.username, activated: true, email });
  });
};

exports.autoSignIn = async (req, res, next) => {
  const { token, username, email, clientId } = req.body;
  // console.log(clientId);
  const socket = req.app.get('socket');

  await OnlineModule.findOneAndUpdate(
    { email },
    { email, clientId, online: true }
  );
  // const userOnline = await OnlineModule.findOne({ email });

  // if (userOnline) {
  // await socket.broadcast.to(isOnline.clientId).emit('session_timeout', email);
  // console.log('here');
  // }

  await socket.broadcast.emit('user', {
    email,
    clientId,
    message: `${email} has logged in`,
  });
  res.status(200).json({ token, username, activated: true, email });
};

exports.googleSignIn = async (req, res, next) => {
  const bodyValidation = bodyCheck(req, res);
  if (bodyValidation === false) return;

  const { name, email } = req.body;

  const userExist = await UserModule.findOne({ email });
  if (!userExist) {
    const createUser = await UserModule({
      username: name,
      email,
      country: 'Global',
      city: 'Global',
      phone: '000000000',
      password: 'None',
      activated: true,
    });
    await createUser.save();
  }

  const identifier = { id: email };
  jwt.sign(identifier, process.env.SECERT, (_error, token) => {
    res.status(200).json({ token, username: name, activated: false, email });
  });
};

exports.verificationCode = async (req, res, next) => {
  const bodyValidation = bodyCheck(req, res);
  if (bodyValidation === false) return;

  const { userMail } = req.body;
  const secretPass = generateCodeVerification();

  const mailContent = {
    from: process.env.SENDER_NODEMAILER,
    to: userMail,
    subject: 'Verify your account',
    text: 'That was easy!',
    html: `<b>Hello Friend! </b><br> Your secret code is ${secretPass}<br/>`,
  };

  transporter.sendMail(mailContent, (err, _info) => {
    if (err) return console.log(err, '?!?!');
    res.status(200).json({
      message: `Please check your mailbox for verifying your account `,
      pass: secretPass,
    });
  });
};

exports.verifyAccount = async (req, res, next) => {
  const bodyValidation = bodyCheck(req, res);
  if (bodyValidation === false) return;

  const { userMail } = req.body;

  await UserModule.findOneAndUpdate({ email: userMail }, { activated: true });

  const message = new Message(
    `Congratulations ${userMail}, your account activation has been initiated`
  );
  res.status(200).json(message);
};

exports.logout = async (req, res, next) => {
  const { email, clientId } = req.body;
  await OnlineModule.findOneAndRemove({ clientId });
  getIO().emit('logout', { email });
  res.status(200).json({ email });
};
