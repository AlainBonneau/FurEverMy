import "dotenv/config";
import pg from "pg";
import { Sequelize } from "sequelize";

import errorHandler from "./middlewares/errorHandler.middleware.js";

const database = process.env.DATABASE_URL;

export const sequelize = new Sequelize(database, {
  // Attention, si tu mets le site en ligne, tu dois activer le certificat SSL en décommentant le code ci-dessous.
  dialect: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  errorHandler._500(error);
}

export default sequelize;
