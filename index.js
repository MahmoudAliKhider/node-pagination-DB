const express = require("express");

const dbContext = require("./database/DB");

require("dotenv").config();

const app = express();
dbContext();

app.use(express.json());
app.use("/api/products", require("./router/product-route"));


const port = 4000 || proccess.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));