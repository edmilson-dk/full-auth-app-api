const speakeasy = require("speakeasy");

const { UserRepository } = require("../../application/repositories/user");

class DisableUserMFAController {
  async handle(req, res) {
    const userId = req.userId;

    try {
      await UserRepository.updateUserActiveMfa(userId, false);

      return res.status(200).json({
        disabled: true,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = { DisableUserMFAController };
