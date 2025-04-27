const express = require("express");
const Account = require("../models/account.model");
const Document = require("../models/document.model");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/:id", async (req, res) => {
  const documentId = req.params.id;
  try {
    const document = await Document.findByPk(documentId);
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ error: `Document with Id: ${documentId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const document = await Document.create(req.body);
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/:id", async (req, res) => {
  const documentId = req.params.id;
  try {
    const document = await Document.findByPk(documentId);
    if (document) {
      await document.update(req.body);
      res.json(document);
    } else {
      res.status(404).json({ error: `Document with Id: ${documentId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/:id", async (req, res) => {
  const documentId = req.params.id;
  try {
    const document = await Document.findByPk(documentId);
    if (document) {
      await document.destroy();
      res.json({ message: `Document with Id: ${documentId} deleted successfully` });
    } else {
      res.status(404).json({ error: `Document with Id: ${documentId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/account/:id", async (req, res) => {
  const accountId = req.params.id;
  try {
    const account = await Account.findByPk(accountId);
    if (account) {
      const documents = await Document.findAll({ where: { accountId: accountId } });
      res.json(documents);
    } else {
      res.status(404).json({ error: `Account with Id: ${accountId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
