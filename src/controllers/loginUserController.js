const { UserRepository } = require("../application/repositories/user");
const { hash, compareHash } = require("../shared/security/hash");
const { createJWT } = require("../shared/security/jwt");

class LoginUserController {
  async handle(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const existsUser = await UserRepository.getUserByEmail(email);

      if (!existsUser) {
        return res.status(400).json({ error: "User not found" });
      }

      const userPassword = await UserRepository.getUserPassword(existsUser.id);
      const isValid = await compareHash(password, userPassword.password);

      if (!isValid) {
        return res.status(400).json({ error: "Invalid password or email" });
      }

      if (!existsUser.activeMfa) {
        const token = createJWT({
          userId: existsUser.id,
          email: existsUser.email,
        });

        return res.status(200).json({
          user: {
            id: existsUser.id,
            name: existsUser.name,
            email: existsUser.email,
          },
          useMfa: false,
          token,
        });
      }

      return res.status(200).json({
        user: {
          id: existsUser.id,
          name: existsUser.name,
          email: existsUser.email,
        },
        useMfa: true,
        token: null,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = { LoginUserController };
