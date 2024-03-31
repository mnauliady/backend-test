const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 3000;
const route = require("./src/routes/route.js");

// api documentation "http://localhost:3000/api-docs"
const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./apidocs.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

app.use(route);
