import bcrypt from "bcrypt";
import "dotenv/config";
import { Animal, Task, User } from "../models/associations.js";

console.log("Création des données...");

const password = "Az123456";
const nbOfSaltRounds = parseInt(process.env.NB_OF_SALT_ROUNDS) || 10;
const hashedPassword = await bcrypt.hash(password, nbOfSaltRounds);

await User.create({
  avatar: "users/lucas.png",
  email: "lucasbertrand.oc@gmail.com",
  lastname: "BERTRAND",
  firstname: "Lucas",
  birthdate: new Date("1999-02-08"),
  password: hashedPassword,
  role: "Admin",
  leaving_date: null,
  is_active: true,
});