const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: process.env.PORT_NODEMAILER,
  host: process.env.HOST_NODEMAILER,
  auth: {
    user: process.env.SENDER_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
  secure: true,
});

module.exports = transporter;
