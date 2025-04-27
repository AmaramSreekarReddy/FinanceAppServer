const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "FINANCE",
  "root",
  "Password@125",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const connection = async () => {
  await sequelize
    .sync()
    .then(() => {
      console.log("Database sync successful!");
    })
    .catch((err) => {
      console.error("Error syncing database: ", err);
    });
};

module.exports = { connection, sequelize };
