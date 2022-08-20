const generateCodeVerification = () =>
  (Math.random() + 1).toString(36).substring(7);

module.exports = generateCodeVerification;
