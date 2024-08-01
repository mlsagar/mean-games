require("dotenv").config();
require("./data/database-connection");

const express = require("express");
const path = require("path");
const port = process.env.PORT;
const routes = require("./api/routes");

const application = express();

application.use(express.static(path.join(__dirname, "public")));

application.use(express.json());
application.use(express.urlencoded({extended: true}))
application.use(process.env.URL_API, routes);

application.listen(port, console.log("Application listening at " + port));