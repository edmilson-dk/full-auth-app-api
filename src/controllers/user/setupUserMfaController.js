const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const { UserRepository } = require("../../application/repositories/user");

class SetupUserMFAController {
  async handle(req, res) {
    const userId = req.userId;

    try {
      const user = await UserRepository.getUserById(userId);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      if (user.activeMfa) {
        return res.status(400).json({ error: "User already has MFA enabled" });
      }

      const hasVerificated = await UserRepository.getUserMfaVerificated(userId);

      if (!hasVerificated.mfa_verificated) {
        const secret = speakeasy.generateSecret({
          length: 20,
          name: "My MFA App",
        });

        const mfaSecret = secret.base32;

        await UserRepository.updateUserMfaSecret(userId, mfaSecret);

        return await qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
          if (err) {
            return res.status(500).json({ error: "Internal server error" });
          }

          return res.status(201).json({
            qrCode: data_url,
            haveSecret: false,
          });
        });
      }

      await UserRepository.updateUserActiveMfa(userId, true);

      return res.status(201).json({
        haveSecret: true,
        qrCode: "",
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = { SetupUserMFAController };
