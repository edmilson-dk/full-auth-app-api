const speakeasy = require("speakeasy");

const { UserRepository } = require("../application/repositories/user");

class EnableUserMFAController {
  async handle(req, res) {
    const userId = req.userId;
    const { code } = req.body;

    try {
      const user = await UserRepository.getUserById(userId);

      if (!user) {
        return res
          .status(400)
          .json({ enabled: false, error: "User not found" });
      }

      const userSecret = await UserRepository.getUserMfaSecret(userId);

      const isValid = speakeasy.totp.verify({
        secret: userSecret.mfa_secret,
        encoding: "base32",
        token: code,
      });

      if (!isValid) {
        return res
          .status(400)
          .json({ enabled: false, error: "Invalid MFA code" });
      }

      await UserRepository.updateUserActiveMfa(userId, true);

      return res.status(200).json({
        message: "MFA enabled successfully",
        enabled: true,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = { EnableUserMFAController };
