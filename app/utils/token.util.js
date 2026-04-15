import "dotenv/config";
import jwt from "jsonwebtoken";

export const createToken = (data) => {
  if (!process.env.SECRET_TOKEN_KEY) {
    throw new Error("SECRET_TOKEN_KEY is missing in environment variables");
  }

  return jwt.sign(data, process.env.SECRET_TOKEN_KEY, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

export const createRefreshToken = (data) => {
  if (!process.env.SECRET_REFRESHTOKEN_KEY) {
    throw new Error(
      "SECRET_REFRESHTOKEN_KEY is missing in environment variables"
    );
  }

  return jwt.sign(data, process.env.SECRET_REFRESHTOKEN_KEY, {
    expiresIn: "1D",
    algorithm: "HS256",
  });
};
