import { sequelize } from "../models/associations.js";

async function dropTables() {
  try {
    console.log("🗑️ Suppression des tables existantes...");
    await sequelize
      .getQueryInterface()
      .dropTable("animal_has_task", { cascade: true });
    await sequelize
      .getQueryInterface()
      .dropTable("user_has_task", { cascade: true });
    await sequelize
      .getQueryInterface()
      .dropTable("animal_has_breed", { cascade: true });
    await sequelize.getQueryInterface().dropTable("species", { cascade: true });
    await sequelize.getQueryInterface().dropTable("breed", { cascade: true });
    console.log("✅ Toutes les tables ont été supprimées.");
  } catch (error) {
    console.error("❌ Erreur lors de la suppression des tables :", error);
  }
}

dropTables();

console.log("🚧 Définition des tables...");
await sequelize.sync();

console.log("✅ Migration OK ! Fermeture de la base...");
await sequelize.close();
