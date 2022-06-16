const { Router } = require("express");

const {
  makeCreateUserController,
  makeLoginUserController,
  makeEnableUserMFAController,
  makeMFAUserAuthenticationController,
  makeSetupUserMFAController,
  makeGetUserDataController,
  makeDisableUserMFAController,
} = require("../factories/user");
const { authMiddleware } = require("./auth-middleware");

const userRoutes = Router();

userRoutes.post("/signup", makeCreateUserController);
userRoutes.post("/login", makeLoginUserController);
userRoutes.post("/mfa/authenticate", makeMFAUserAuthenticationController);

// authenticated routes
userRoutes.post("/mfa/setup", authMiddleware, makeSetupUserMFAController);
userRoutes.post("/mfa/enable", authMiddleware, makeEnableUserMFAController);
userRoutes.get("/me", authMiddleware, makeGetUserDataController);
userRoutes.get("/validate", authMiddleware, (req, res) => {
  res.send({
    valid: true,
  });
});
userRoutes.post("/mfa/disable", authMiddleware, makeDisableUserMFAController);

module.exports = { userRoutes };
