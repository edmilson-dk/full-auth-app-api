const { verifyJWT } = require("../../shared/security/jwt");

async function authMiddleware(req, res, next) {
  const headers = req.headers.authorization;

  if (!headers) {
    return res.status(401).json({ error: "No jwt token provieded" });
  }

  const parts = headers.split(" ");

  if (!(parts.length === 2)) {
    return res.status(401).json({ error: "Token jwt properties error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/.test(scheme)) {
    return res.status(401).json({ error: "Token jwt malformatted" });
  }

  verifyJWT(token, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token jwt invalid" });
    }

    req.userId = decoded.userId;

    return next();
  });
}

module.exports = { authMiddleware };
