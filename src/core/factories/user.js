const {
  CreateUserController,
} = require("../../controllers/createUserController");
const {
  DisableUserMFAController,
} = require("../../controllers/disableUserMfaController");
const {
  EnableUserMFAController,
} = require("../../controllers/enableUserMFAController");
const {
  GetUserDataController,
} = require("../../controllers/getUserDataController");
const {
  LoginUserController,
} = require("../../controllers/loginUserController");
const {
  MFAUserAuthenticationController,
} = require("../../controllers/mfaUserAuthenticationController");
const {
  SetupUserMFAController,
} = require("../../controllers/setupUserMfaController");

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const enableUserMFAController = new EnableUserMFAController();
const mfaUserAuthenticationController = new MFAUserAuthenticationController();
const setupUserMFAController = new SetupUserMFAController();
const getUserDataController = new GetUserDataController();
const disableUserMFAController = new DisableUserMFAController();

async function makeCreateUserController(req, res) {
  return await createUserController.handle(req, res);
}

async function makeLoginUserController(req, res) {
  return await loginUserController.handle(req, res);
}

async function makeEnableUserMFAController(req, res) {
  return await enableUserMFAController.handle(req, res);
}

async function makeMFAUserAuthenticationController(req, res) {
  return await mfaUserAuthenticationController.handle(req, res);
}

async function makeSetupUserMFAController(req, res) {
  return await setupUserMFAController.handle(req, res);
}

async function makeGetUserDataController(req, res) {
  return await getUserDataController.handle(req, res);
}

async function makeDisableUserMFAController(req, res) {
  return await disableUserMFAController.handle(req, res);
}

module.exports = {
  makeCreateUserController,
  makeLoginUserController,
  makeEnableUserMFAController,
  makeMFAUserAuthenticationController,
  makeSetupUserMFAController,
  makeGetUserDataController,
  makeDisableUserMFAController,
};
