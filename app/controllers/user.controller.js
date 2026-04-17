import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import { createToken } from "../utils/token.util.js";
import userSchemas from "../validators/user.schemas.js";
import validate from "../validators/validator.js";

const userController = {
  getAllUsers: async (req, res) => {
    const userList = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    console.log(User.associations);
    res.json(userList);
  },

  getById: async (req, res) => {
    const userId = req.userId;
    console.log("getById userId :", userId);

    if (!userId) {
      return res.status(404).json({ error: "Id inconnu" });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    console.log("getById user :", user);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur inconnu" });
    }

    const userTokenJWT = createToken({
      avatar: user.dataValues.avatar,
      email: user.dataValues.email,
      userId: user.dataValues.id,
      lastname: user.dataValues.lastname,
      firstname: user.dataValues.firstname,
      role: user.dataValues.role,
      is_active: user.dataValues.is_active,
    });

    res.json(userTokenJWT);
  },

  update: async (req, res) => {
    const userId = req.userId; // ID extrait du token JWT
    console.log("ID utilisateur reçu du JWT :", userId);
    console.log("Données reçues :", req.body);

    if (!userId) {
      return res.status(400).json({ error: "ID utilisateur invalide." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    const forbiddenFields = [
      "role",
      "is_active",
      "arrival_date",
      "leaving_date",
    ];
    const triesToUpdateForbiddenFields = forbiddenFields.some(
      (field) => req.body[field] !== undefined,
    );

    if (triesToUpdateForbiddenFields) {
      return res.status(403).json({
        error:
          "Modification interdite sur role/is_active/arrival_date/leaving_date.",
      });
    }

    const updatedUser = {};
    [
      "avatar",
      "email",
      "lastname",
      "firstname",
      "birthdate",
      "password",
    ].forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedUser[field] = req.body[field];
      }
    });

    if (updatedUser.email && updatedUser.email !== user.email) {
      const userWithSameEmail = await User.findOne({
        where: { email: updatedUser.email },
      });

      if (userWithSameEmail) {
        return res.status(400).json({ error: "Cet email est déjà utilisé." });
      }
    }

    if (updatedUser.password) {
      const nbOfSaltRounds = parseInt(process.env.NB_OF_SALT_ROUNDS, 10) || 10;
      updatedUser.password = await bcrypt.hash(
        updatedUser.password,
        nbOfSaltRounds,
      );
    }

    try {
      await user.update(updatedUser);
      console.log("Utilisateur mis à jour avec succès :", user);
      const safeUser = user.toJSON();
      delete safeUser.password;
      res.json(safeUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
    }
  },

  createUser: async (req, res) => {
    const { avatar, email, lastname, firstname, birthdate, password, role } =
      validate(userSchemas.createUser, req.body);

    if (!email || !lastname || !firstname || !password || !birthdate) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoires." });
    }

    const nbOfSaltRounds = parseInt(process.env.NB_OF_SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, nbOfSaltRounds);

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    }

    try {
      await User.create({
        avatar,
        email,
        lastname,
        firstname,
        birthdate,
        password: hashedPassword,
        role: "user",
        is_active: true,
      });

      res.status(200).json("Utilisateur créé avec succès.");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'utilisateur." });
    }
  },

  getUserWithTask: async (req, res) => {
    const userTask = await User.findAll({
      include: { model: Task, as: "task" },
    });
    res.json(userTask);
  },

  softDelete: async (req, res) => {
    const email = req.body.email;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoire" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    user.is_active = false;

    try {
      user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la desactivation de l'utilisateur" });
    }
  },

  addNewUser: async (req, res) => {
    const { avatar, email, lastname, firstname, birthdate, password, role } =
      validate(userSchemas.createUser, req.body);

    const nbOfSaltRounds = parseInt(process.env.NB_OF_SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, nbOfSaltRounds);

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    }

    try {
      await User.create({
        avatar,
        email,
        lastname,
        firstname,
        birthdate,
        password: hashedPassword,
        role,
        is_active: true,
      });

      res.status(200).json("Utilisateur créé avec succès.");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'utilisateur." });
    }
  },
};

export default userController;
