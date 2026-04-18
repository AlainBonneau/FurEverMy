import "dotenv/config";
import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.middleware.js";

const jwtMiddleware = (req, res, next) => {
  if (!process.env.SECRET_TOKEN_KEY) {
    return errorHandler._500(
      new Error("SECRET_TOKEN_KEY is missing in environment variables"),
      req,
      res
    );
  }

  const token = req.cookies?.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token manquant (cookie HttpOnly attendu)." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY, {
      algorithms: ["HS256"],
    });

    req.userId = decodedToken.userId;
    req.userRole = decodedToken.role;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expiré" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Token invalide" });
    } else {
      errorHandler._500(error, req, res);
    }
  }
};

export default jwtMiddleware;
