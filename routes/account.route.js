const express = require("express");
const Account = require("../models/account.model");
const Customer = require("../models/customer.model");
const Document = require("../models/document.model");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/:id", async (req, res) => {
  const accountId = req.params.id;
  try {
    const account = await Account.findByPk(accountId);
    if (account) {
      res.json(account);
    } else {
      res.status(404).json({ error: `Account with Id: ${accountId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/:id", async (req, res) => {
  const accountId = req.params.id;
  try {
    const account = await Account.findByPk(accountId);
    if (account) {
      await account.update(req.body);
      res.json(account);
    } else {
      res.status(404).json({ error: `Account with Id: ${accountId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/:id", async (req, res) => {
  const accountId = req.params.id;
  try {
    const account = await Account.findByPk(accountId);
    if (account) {
      const documents = await Document.findAll({ where: { accountId: accountId } });
      
      for (const document of documents) {
        await document.destroy();
      }
      
      await account.destroy();
      res.json({ message: `Account with Id: ${accountId} deleted successfully` });
    } else {
      res.status(404).json({ error: `Account with Id: ${accountId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/customer/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (customer) {
      const accounts = await Account.findAll({ where: { customerId: customerId } });
      res.json(accounts);
    } else {
      res.status(404).json({ error: `Customer with Id: ${customerId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
