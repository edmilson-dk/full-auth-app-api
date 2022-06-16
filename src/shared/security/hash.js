const bcryptjs = require("bcryptjs");

async function hash(value) {
  const encrypted = await bcryptjs.hash(value, 8);
  return encrypted;
}

async function compareHash(value, encrypted) {
  const isValid = await bcryptjs.compare(value, encrypted);
  return isValid;
}

module.exports = {
  hash,
  compareHash,
};
