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

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header manquant" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Format attendu: Authorization: Bearer <token>" });
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
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
