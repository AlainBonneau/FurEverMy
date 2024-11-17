import bcrypt from "bcrypt";
import "dotenv/config";
import { Animal, Task, User } from "../models/associations.js";

console.log("Création des données...");

const password = "#MonSuperMdp!";
const nbOfSaltRounds = parseInt(process.env.NB_OF_SALT_ROUNDS) || 10;
const hashedPassword = await bcrypt.hash(password, nbOfSaltRounds);

// Création des animaux

await Animal.create({
  avatar: "users/lula.jpg",
  name: "Lula",
  birthdate: new Date("2020-06-08"),
  gender: "Female",
  health: "Good",
  leaving_date: null,
  about: "Elle est féroce",
  is_active: true,
});

await Animal.create({
  avatar: "users/lucas.png",
  name: "Leo",
  birthdate: new Date("2021-11-17"),
  gender: "Male",
  health: "Good",
  leaving_date: null,
  about: "Il est gentil",
  is_active: true,
});

await Animal.create({
  avatar: "users/lucas.png",
  name: "Mira",
  birthdate: new Date("2015-01-12"),
  gender: "Female",
  health: "Bad",
  leaving_date: null,
  about: "Elle est malade",
  is_active: true,
});

// Créartion des tasks

await Task.create({
  title: "Nettoyer la litière de Mira",
  label: "L'odeur est insoutenable",
  start_date: new Date("2024-07-09"),
  end_date: new Date("2024-07-16"),
  is_done: false,
});

await Task.create({
  title: "Laver Léo",
  label: "Il ne sent vraiment pas bon.",
  start_date: new Date("2024-07-09"),
  end_date: new Date("2024-07-16"),
  is_done: false,
});

await Task.create({
  title: "Nettoyer la litière de Lula",
  label: "L'odeur est insoutenable",
  start_date: new Date("2024-07-01"),
  end_date: new Date("2024-07-09"),
  is_done: true,
});

// Création des Users

await User.create({
  avatar: "users/alain.jpg",
  email: "alain.bonneau@oclock.school",
  lastname: "BONNEAU",
  firstname: "Alain",
  birthdate: new Date("1997-11-28"),
  password: hashedPassword,
  role: "Admin",
  leaving_date: null,
  is_active: true,
});
