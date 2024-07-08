import "dotenv/config";
import jwt from "jsonwebtoken";

export const createToken = (data) => {
  return jwt.sign(data, process.env.SECRET_TOKEN_KEY, {
    expiresIn: "1h",
  });
};

export const createRefreshToken = (data) => {
  return jwt.sign(data, process.env.SECRET_REFRESHTOKEN_KEY, {
    expiresIn: "1D",
  });
};
