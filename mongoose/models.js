const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
});

const user = mongoose.model('userdatas', userDataSchema);

module.exports = {
  user,
};
