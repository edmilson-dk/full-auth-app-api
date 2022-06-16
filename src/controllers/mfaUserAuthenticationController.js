const speakeasy = require("speakeasy");

const { UserRepository } = require("../application/repositories/user");
const { createJWT } = require("../shared/security/jwt");

class MFAUserAuthenticationController {
  async handle(req, res) {
    const { code, userId } = req.body;

    try {
      const user = await UserRepository.getUserById(userId);

      if (!user) {
        return res.status(400).json({ valid: false, error: "User not found" });
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
          .json({ valid: false, error: "Invalid MFA code" });
      }

      const token = createJWT({
        userId: user.id,
        email: user.email,
      });

      return res.status(200).json({
        valid: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = { MFAUserAuthenticationController };
