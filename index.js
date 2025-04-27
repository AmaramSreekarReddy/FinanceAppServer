const express = require("express");
const bodyParser = require("body-parser");
const customer = require("./routes/customer.route");
const account = require("./routes/account.route");
const document = require("./routes/document.route");

const app = express();
const port = 3000;

const cors = require("cors");
const { connection } = require("./config/mysql");

app.use(cors());
app.use(bodyParser.json());

connection();

app.use("/customer", customer);
app.use("/account", account);
app.use("/document", document);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
