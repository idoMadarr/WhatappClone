class Message {
  constructor(errorMessage, errorCode, action = null) {
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
    this.action = action;
  }
}

module.exports = Message;
