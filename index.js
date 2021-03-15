const express = require("express");
const config = require("config");
require("./src/db/mongoose");
require("./src/startup/config")();
const users = require("./src/routes/users");
const auth = require("./src/routes/auth");
const drugs = require("./src/routes/drugs");
const sales = require("./src/routes/sales");
const dashboard = require("./src/routes/dashboard");
const cors = require("cors");
const helmet = require('helmet')
const compression = require('compression')
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet())
app.use(compression())
app.use(users);
app.use(auth);
app.use(drugs);
app.use(sales);
app.use(dashboard);

app.listen(port, () => {
  console.log("server is up on port" + port);
});
