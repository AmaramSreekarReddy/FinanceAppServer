const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
    },
    createdTime: {
      type: DataTypes.TIME,
    },
  },
  { tableName: "Admin", timestamps: false }
);

module.exports = Admin;
