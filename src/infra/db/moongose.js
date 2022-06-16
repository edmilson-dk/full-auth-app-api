const mongoose = require("mongoose");
const { ENVS } = require("../../shared/constants");

async function connect() {
  await mongoose.connect(ENVS.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to MongoDB");
}

(async () => {
  await connect();
})();

module.exports = {
  db: mongoose,
};
