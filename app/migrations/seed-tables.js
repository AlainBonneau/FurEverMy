import bcrypt from "bcrypt";
import "dotenv/config";
import { Animal, Task, User } from "../models/associations.js";

console.log("Création des données...");

const password = "#MonSuperMdp!";
const nbOfSaltRounds = parseInt(process.env.NB_OF_SALT_ROUNDS) || 10;
const hashedPassword = await bcrypt.hash(password, nbOfSaltRounds);

// Création des animaux

await Animal.create({
  avatar: "animals/lula.jpg",
  name: "Lula",
  birthdate: new Date("2020-06-08"),
  gender: "Female",
  health: "Good",
  leaving_date: null,
  about: "Elle est féroce",
  is_active: true,
});

await Animal.create({
  avatar: "animals/leo.jpg",
  name: "Leo",
  birthdate: new Date("2021-11-17"),
  gender: "Male",
  health: "Good",
  leaving_date: null,
  about: "Il est gentil",
  is_active: true,
});

await Animal.create({
  avatar: "animals/mira.jpg",
  name: "Mira",
  birthdate: new Date("2015-01-12"),
  gender: "Female",
  health: "Bad",
  leaving_date: null,
  about: "Elle est malade",
  is_active: true,
});

await Animal.create({
  avatar: "animals/lulu.jpg",
  name: "Lulu",
  birthdate: new Date("2017-11-12"),
  gender: "Female",
  health: "Good",
  leaving_date: null,
  about: "Elle cool",
  is_active: true,
});

await Animal.create({
  avatar: "animals/felix.jpg",
  name: "Felix",
  birthdate: new Date("2018-03-12"),
  gender: "Male",
  health: "Good",
  leaving_date: null,
  about: "Il est cool",
  is_active: true,
});

await Animal.create({
  avatar: "animals/pablo.jpg",
  name: "Pablo",
  birthdate: new Date("2021-11-08"),
  gender: "Male",
  health: "Bad",
  leaving_date: null,
  about: "Il est malade",
  is_active: true,
});

await Animal.create({
  avatar: "animals/nina.jpg",
  name: "Nina",
  birthdate: new Date("2014-04-21"),
  gender: "Female",
  health: "Bad",
  leaving_date: null,
  about: "Elle est malade",
  is_active: true,
});

await Animal.create({
  avatar: "animals/aria.jpg",
  name: "Aria",
  birthdate: new Date("2023-10-12"),
  gender: "Female",
  health: "Good",
  leaving_date: null,
  about: "Elle est méchante",
  is_active: true,
});

await Animal.create({
  avatar: "animals/oscar.jpg",
  name: "Oscar",
  birthdate: new Date("2022-01-12"),
  gender: "Male",
  health: "Good",
  leaving_date: null,
  about: "Il est en bonne santé",
  is_active: true,
});

await Animal.create({
  avatar: "animals/sacha.jpg",
  name: "Sacha",
  birthdate: new Date("2019-10-10"),
  gender: "Male",
  health: "Good",
  leaving_date: null,
  about: "Il est un peu fou",
  is_active: true,
});

await Animal.create({
  avatar: "animals/romy.jpg",
  name: "Romy",
  birthdate: new Date("2012-03-08"),
  gender: "Male",
  health: "Bad",
  leaving_date: null,
  about: "Il est un peu malade",
  is_active: true,
});

await Animal.create({
  avatar: "animals/django.jpg",
  name: "Django",
  birthdate: new Date("2014-01-11"),
  gender: "Male",
  health: "Good",
  leaving_date: new Date("2024-07-09"),
  about: "Il est parti",
  is_active: false,
});

await Animal.create({
  avatar: "animals/violette.jpg",
  name: "Violette",
  birthdate: new Date("2017-08-12"),
  gender: "Female",
  health: "Good",
  leaving_date: null,
  about: "Elle est cool",
  is_active: true,
});

await Animal.create({
  avatar: "animals/coco.jpg",
  name: "Coco",
  birthdate: new Date("2018-04-09"),
  gender: "Male",
  health: "Bad",
  leaving_date: null,
  about: "Il est malade",
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
