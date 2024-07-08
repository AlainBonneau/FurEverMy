import { Model, DataTypes } from "sequelize";
import sequelize from "../database.js";

export class Breed extends Model {}

Breed.init(
  {
    name: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "breed",
  }
);
