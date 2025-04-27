const { DataTypes } = require("sequelize");
const Account = require("./account.model");
const { sequelize } = require("../config/mysql");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    last4ssn: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "Customer", timestamps: false }
);

Customer.hasMany(Account, { foreignKey: 'customerId' });
Account.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = Customer;
