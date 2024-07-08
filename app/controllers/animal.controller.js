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

    if (!animalId) {
      return res.status(404).json({ error: "id inconnu" });
    }

    const {
      avatar,
      name,
      birthdate,
      gender,
      health,
      arrival_date,
      leaving_date,
      about,
      is_active,
    } = req.body;

    const animal = await Animal.findByPk(animalId);

    if (!animal) {
      return res.status(404).json({ error: "Animal inconnu" });
    }

    const updateAnimal = await animal.update({
      avatar,
      name,
      birthdate,
      gender,
      health,
      arrival_date: arrival_date,
      leaving_date: leaving_date || null,
      about: about || null,
      is_active,
    });

    res.json(updateAnimal);
  },
};

export default animalController;
