const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");

    if (token) {
      token = token.slice(7);

      verify(token, "12345678", (error, decoded) => {
        if (error) {
          if (error.name === "TokenExpiredError") {
            res.status(401).json({
              error: true,
              message: "Token expirado.",
              expiredAt: error.expiredAt,
            });
          }

          if (error.name === "JsonWebTokenError") {
            res.status(401).json({
              error: true,
              message: "O token fornecido é inválido.",
            });
          }
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Acesso negado! Usuário não autorizado.",
      });
    }
  },
};
