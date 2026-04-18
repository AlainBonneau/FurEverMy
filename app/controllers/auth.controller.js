import emailValidator from "email-validator";
import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import validate from "../validators/validator.js";
import authSchemas from "../validators/auth.schemas.js";
import { createToken, createRefreshToken } from "../utils/token.util.js";

const ACCESS_TOKEN_COOKIE_NAME = "access_token";
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
const ACCESS_TOKEN_MAX_AGE_MS = 60 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const getSameSiteValue = () => {
  const sameSite = (process.env.COOKIE_SAME_SITE || "none").toLowerCase();

  if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
    return sameSite;
  }

  return "none";
};

const getCookieBaseOptions = () => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE !== "false",
    sameSite: getSameSiteValue(),
    path: "/",
  };

  if (process.env.COOKIE_DOMAIN) {
    cookieOptions.domain = process.env.COOKIE_DOMAIN;
  }

  return cookieOptions;
};

const authController = {
  register: async (req, res) => {
    const validatedBody = validate(authSchemas.registerData, req.body);

    const {
      avatar,
      email,
      lastname,
      firstname,
      birthdate,
      password,
      confirmPassword,
      arrival_date,
      leaving_date,
    } = validatedBody;

    if (
      !email ||
      !lastname ||
      !firstname ||
      !birthdate ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json("Tous les champs sont obligatoires.");
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json("Le mot de passe et sa confirmation ne correspondent pas.");
    }

    if (!emailValidator.validate(email)) {
      return res.status(400).json("Le format de l'email n'est pas valide.");
    }

    if (req.body.role && req.body.role.toLowerCase() !== "user") {
      return res.status(403).json("Création avec rôle interdit.");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json("Cet email est déjà utilisé.");
    }

    const nbOfSaltRounds = parseInt(process.env.NB_OF_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, nbOfSaltRounds);

    await User.create({
      avatar,
      email,
      lastname,
      firstname,
      birthdate,
      password: hashedPassword,
      arrival_date: arrival_date || new Date(),
      leaving_date: leaving_date || null,
      role: "user",
      is_active: true,
    });

    res.status(200).json("Utilisateur créé avec succès");
  },

  login: async (req, res) => {
    const validatedBody = validate(authSchemas.loginData, req.body);
    const { email, password } = validatedBody;

    if (!email || !password) {
      return res.status(400).json("Tous les champs sont obligatoires.");
    }

    if (!emailValidator.validate(email)) {
      return res.status(400).json("Le format de l'email n'est pas valide.");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json("Mauvais couple email/mot de passe.");
    }

    if (!user.dataValues.is_active) {
      return res.status(403).json("Ce compte est désactivé.");
    }

    const isMatching = await bcrypt.compare(password, user.dataValues.password);

    if (!isMatching) {
      return res.status(400).json("Mauvais couple email/mot de passe.");
    }

    const userData = {
      avatar: user.dataValues.avatar,
      userId: user.dataValues.id,
      lastname: user.dataValues.lastname,
      firstname: user.dataValues.firstname,
      role: user.dataValues.role,
    };

    const tokenJWT = createToken(userData);
    const refreshTokenJWT = createRefreshToken({
      userId: user.dataValues.id,
      role: user.dataValues.role,
    });

    const cookieBaseOptions = getCookieBaseOptions();

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, tokenJWT, {
      ...cookieBaseOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE_MS,
    });

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshTokenJWT, {
      ...cookieBaseOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    });

    res.status(200).json({
      message: "Authentification réussie.",
      user: userData,
    });
  },

  logout: async (req, res) => {
    const cookieBaseOptions = getCookieBaseOptions();

    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME, cookieBaseOptions);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, cookieBaseOptions);

    res.status(200).json({ message: "Déconnexion réussie." });
  },
};

export default authController;
