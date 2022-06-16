const { app } = require("./core/app");
const { ENVS } = require("./shared/constants");

app.listen(ENVS.SERVER_PORT, () => {
  console.log(`Server is running on port: ${ENVS.SERVER_PORT}`);
});
