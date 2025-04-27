const express = require("express");
const Customer = require("../models/customer.model");
const Account = require("../models/account.model");
const Document = require("../models/document.model");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: `Customer with Id: ${customerId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (customer) {
      await customer.update(req.body);
      res.json(customer);
    } else {
      res.status(404).json({ error: `Customer with Id: ${customerId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (customer) {
      const accounts = await Account.findAll({ where: { customerId: customerId } });
      
      for (const account of accounts) {
        const accountId = account.id
        const documents = await Document.findAll({ where: { accountId: accountId } });
        
        for (const document of documents) {
          await document.destroy();
        }

        await account.destroy();
      }

      await customer.destroy();
      res.json({ message: `Customer with Id: ${customerId} deleted successfully` });
    } else {
      res.status(404).json({ error: `Customer with Id: ${customerId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
