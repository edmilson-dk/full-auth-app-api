const { UserRepository } = require("../application/repositories/user");
const { hash, compareHash } = require("../shared/security/hash");
const { createJWT } = require("../shared/security/jwt");

class GetUserDataController {
  async handle(req, res) {
    const userId = req.userId;

    try {
      const existsUser = await UserRepository.getUserById(userId);

      if (!existsUser) {
        return res.status(400).json({ error: "User not found" });
      }

      return res.status(200).json(existsUser);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = { GetUserDataController };
