const { sequelize } = require("../config/mysql");
const Customer = require("./customer.model");
const { DataTypes } = require("sequelize");

const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actionType: {
      type: DataTypes.STRING,
    },
    actionTimeStamp: {
      type: DataTypes.DATEONLY,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
    },
    createdTime: {
      type: DataTypes.TIME,
    },
  },
  { tableName: "ActivityLog", timestamps: false }
);

module.exports = ActivityLog;
