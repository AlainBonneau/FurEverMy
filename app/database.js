import "dotenv/config";
import pg from "pg";
import { Sequelize } from "sequelize";

import errorHandler from "./middlewares/errorHandler.middleware.js";

const database = process.env.DATABASE_URL;

export const sequelize = new Sequelize(database, {
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
  },
  pool: {
    max: 10, // maximum de connexions dans le pool
    min: 0, // minimum de connexions dans le pool
    acquire: 30000, // temps d'attente maximum avant qu'une erreur ne soit renvoyée si une connexion ne peut pas être établie
    idle: 10000, // temps avant qu'une connexion inutilisée ne soit libérée
  },
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  errorHandler._500(error);
}

export default sequelize;
