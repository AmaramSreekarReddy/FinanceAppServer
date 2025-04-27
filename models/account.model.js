const { DataTypes } = require("sequelize");
const Document = require("./document.model");
const ActivityLog = require("./activitylog.model");
const { sequelize } = require("../config/mysql");

const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accountNumber: {
      type: DataTypes.STRING,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deliveryFrequency: {
      type: DataTypes.STRING,
    },
    deliveryPreference: {
      type: DataTypes.STRING,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
    createdTime: {
      type: DataTypes.TIME,
    },
  },
  { tableName: "Account", timestamps: false }
);

Account.hasMany(Document, { foreignKey: "accountId" });
Document.belongsTo(Account, { foreignKey: "accountId" });

Account.hasMany(ActivityLog, { foreignKey: "accountId" });
ActivityLog.belongsTo(Account, { foreignKey: "accountId" });

module.exports = Account;
