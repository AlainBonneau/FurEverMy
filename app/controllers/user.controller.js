import { User } from "../models/user.model.js";
import { createToken } from "../utils/token.util.js";
import userSchemas from "../validators/user.schemas.js";
import validate from "../validators/validator.js";

const userController = {
  getAllUsers: async (req, res) => {
    const userList = await User.findAll();
    res.json(userList);
  },

  getById: async (req, res) => {
    const userId = req.userId;
    console.log("getById userId :", userId);

    if (!userId) {
      return res.status(404).json({ error: "Id inconnu" });
    }

    const user = await User.findByPk(userId);
    console.log("getById user :", user);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur inconnu" });
    }

    const userTokenJWT = createToken({ ...user.dataValues });

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

    const updatedUser = {};
    [
      "avatar",
      "email",
      "lastname",
      "firstname",
      "birthdate",
      "password",
      "arrival_date",
      "leaving_date",
      "role",
      "is_active",
    ].forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedUser[field] = req.body[field];
      }
    });

    try {
      await user.update(updatedUser);
      console.log("Utilisateur mis à jour avec succès :", user);
      res.json(user);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
    }
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
};

export default userController;
