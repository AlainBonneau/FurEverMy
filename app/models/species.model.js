import { Model, DataTypes } from "sequelize";
import sequelize from "../database.js";

export class Species extends Model {}

Species.init(
  {
    name: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "species",
  }
);
