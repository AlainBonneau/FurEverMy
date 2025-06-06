import emailValidator from "email-validator";
import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import validate from "../validators/validator.js";
import authSchemas from "../validators/auth.schemas.js";
import { createToken, createRefreshToken } from "../utils/token.util.js";

const authController = {
  register: async (req, res) => {
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
    } = req.body;

    // Validation
    validate(authSchemas.registerData, req.body);

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
    const { email, password } = req.body;

    validate(authSchemas.loginData, req.body);

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

    const isMatching = bcrypt.compareSync(password, user.dataValues.password);

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

    console.log("Succes du login");

    res.status(200).json({ tokenJWT, refreshTokenJWT });
  },
};

export default authController;
