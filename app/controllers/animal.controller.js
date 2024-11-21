import { Animal } from "../models/animal.model.js";

const animalController = {
  getAllAnimals: async (req, res) => {
    const animalList = await Animal.findAll();
    res.json(animalList);
  },

  getById: async (req, res) => {
    const animalId = parseInt(req.params.id);

    if (!animalId) {
      return res.status(404).json({ error: "id inconnu" });
    }

    const animal = await Animal.findByPk(animalId);

    if (!animal) {
      return res.status(404).json({ error: "Animal inconnu" });
    }
    res.json(animal);
  },

  insert: async (req, res) => {
    const {
      avatar,
      name,
      birthdate,
      gender,
      health,
      arrival_date,
      leaving_date,
      is_active,
      about,
    } = req.body;
    if (
      !name ||
      !birthdate ||
      !gender ||
      !health ||
      !arrival_date ||
      !is_active
    ) {
      console.log("Tous les champs sont obligatoire");
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoire" });
    }
    const newAnimal = {
      avatar,
      name,
      birthdate,
      gender,
      health,
      arrival_date: arrival_date,
      leaving_date: leaving_date || null,
      about: about || null,
      is_active,
    };
    await Animal.create(newAnimal);
    res.status(201).json(newAnimal);
  },

  update: async (req, res) => {
    const animalId = parseInt(req.params.id);

    if (isNaN(animalId)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const {
      avatar,
      name,
      birthdate,
      gender,
      health,
      leaving_date,
      about,
      is_active,
    } = req.body;

    try {
      const animal = await Animal.findByPk(animalId);

      if (!animal) {
        return res.status(404).json({ error: "Animal inconnu" });
      }

      // Validation des champs
      const validateDate = (date) => {
        if (!date) return null;
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime())
          ? null
          : parsedDate.toISOString().split("T")[0];
      };

      const updateFields = {
        avatar: avatar || animal.avatar,
        name: name || animal.name,
        birthdate: validateDate(birthdate) || animal.birthdate,
        gender: gender || animal.gender,
        health: health || animal.health,
        leaving_date: validateDate(leaving_date) || animal.leaving_date,
        about: about || animal.about,
        is_active: is_active !== undefined ? is_active : animal.is_active,
      };

      // Mise à jour
      const updatedAnimal = await animal.update(updateFields);

      res.json(updatedAnimal);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'animal" });
    }
  },
};

export default animalController;
