require("dotenv").config();

const ENVS = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  SERVER_PORT: process.env.PORT,
};

module.exports = {
  ENVS,
};
