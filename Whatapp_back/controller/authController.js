const UserModule = require('../modules/UserModule');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateCodeVerification = require('../utils/codeVerification');
const transporter = require('../services/nodemailer');
const bodyCheck = require('../utils/bodyCheck');
const Message = require('../modules/Message');

exports.signUp = async (req, res, _next) => {
  const bodyValidation = bodyCheck(req, res);
  if (bodyValidation === false) return;

  const { username, email, password, country, city, phone, isAdmin } = req.body;

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

  if (!userExist.activated) {
    const activationMessage = new Message(
      'Make sure to activate your account',
      401,
      { require: 'ACTIVATION_REQUIRED' }
    );
    return res.status(401).json(activationMessage);
  }

  const identifier = { id: userExist._id };
  jwt.sign(identifier, process.env.SECERT, (_error, token) => {
    res.status(200).json({ token, username: userExist.username });
  });
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
    res.status(200).json({ token, username: email });
  });
};

exports.verificationCode = async (req, res, next) => {
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
    if (err) return next();
    res.status(200).json({
      message: `Please check your mailbox for verifying your account `,
      pass: secretPass,
    });
  });
};

exports.verifyAccount = async (req, res, next) => {
  const { userMail } = req.body;

  await UserModule.findOneAndUpdate({ email: userMail }, { activated: true });

  const message = new Message(
    `Congratulations ${userMail}, your account activation has been initiated`,
    200
  );
  res.status(200).json(message);
};
