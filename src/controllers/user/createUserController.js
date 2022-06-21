const { UserRepository } = require("../../application/repositories/user");
const { hash } = require("../../shared/security/hash");
const { createJWT } = require("../../shared/security/jwt");

class CreateUserController {
  async handle(req, res) {
    const { name, email, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const existsUser = await UserRepository.findUserByEmail(email);

      if (existsUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await hash(password);

      const user = await UserRepository.crateUser({
        name,
        email,
        password: hashedPassword,
      });

      const token = createJWT({
        userId: user.id,
        email: user.email,
      });

      return res.status(201).json({
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = { CreateUserController };
