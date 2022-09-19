const mongoose = require('mongoose');

const onlineSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
    unique: true,
  },
  online: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Online', onlineSchema);
