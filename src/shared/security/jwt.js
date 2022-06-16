const JWT = require("jsonwebtoken");
const { ENVS } = require("../constants");

function createJWT(payload, expires = "24h") {
  const token = JWT.sign(payload, ENVS.JWT_SECRET, {
    expiresIn: expires,
  });
  return token;
}

function verifyJWT(token, callback) {
  JWT.verify(token, ENVS.JWT_SECRET, callback);
}

module.exports = {
  createJWT,
  verifyJWT,
};
