const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");
const Document = sequelize.define(
  "Document",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    docDate: {
      type: DataTypes.DATEONLY,
    },
    documentType: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
    },
    createdTime: {
      type: DataTypes.TIME,
    },
  },
  { tableName: "Document", timestamps: false }
);

module.exports = Document;
