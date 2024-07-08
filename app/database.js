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
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  errorHandler._500(error);
}

export default sequelize;
