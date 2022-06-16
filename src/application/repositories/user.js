const { User } = require("../../infra/schemas/users");

class UserMapper {
  static toDto(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      activeMfa: user.active_mfa,
    };
  }
}

class UserRepositoryClass {
  async crateUser({ name, email, password }) {
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    return {
      name: user.name,
      email: user.email,
      id: user._id,
    };
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email }, { password: 0, mfa_secret: 0 });
    return UserMapper.toDto(user);
  }

  async getUserById(id) {
    const user = await User.findById(id, { password: 0, mfa_secret: 0 });
    return UserMapper.toDto(user);
  }

  async getUserPassword(id) {
    return await User.findById(id, { password: 1 });
  }

  async getUserMfaSecret(id) {
    return await User.findById(id, { mfa_secret: 1 });
  }

  async updateUserActiveMfa(id, activeMfa) {
    return await User.findByIdAndUpdate(id, { active_mfa: activeMfa });
  }

  async updateUserMfaSecret(id, mfaSecret) {
    return await User.findByIdAndUpdate(id, { mfa_secret: mfaSecret });
  }
}

const UserRepository = new UserRepositoryClass();

module.exports = { UserRepository };
