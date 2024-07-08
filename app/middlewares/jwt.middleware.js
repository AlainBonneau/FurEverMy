import "dotenv/config";
import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.middleware.js";

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader : ", authHeader);

  if (!authHeader) {
    console.log("Authorization header manquant");
    return res.status(401).json({ error: "Authorization header manquant" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Token manquant");
    return res.status(401).json({ error: "Token manquant" });
  }
  console.log("token : ", token);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY, {
      algorithms: ["HS256"],
    });

    console.log("Token vérifié avec succès:", decodedToken);

    req.userId = decodedToken.userId;
    console.log("jwtMiddleware req.userId :", req.userId);
    req.userRole = decodedToken.role;
    console.log("jwtMiddleware req.userRole :", req.userRole);

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Token expiré");
      return res.status(403).json({ error: "Token expiré" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("Token invalide");
      return res.status(401).json({ error: "Token invalide" });
    } else {
      console.log("Erreur interne du serveur", error);
      errorHandler._500(error, req, res);
    }
  }
};

export default jwtMiddleware;
