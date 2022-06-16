const { db } = require("../db/moongose");

const userSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  active_mfa: {
    type: Boolean,
    default: false,
  },
  mfa_secret: {
    type: String,
    default: null,
  },
});

const User = db.model("User", userSchema);

module.exports = { User };
