const express = require("express");
const ConnectDb = require("./config/db");
ConnectDb();
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");
app.use("/api/v1", mainRouter);

app.listen(port, () => console.log("server listening on port", port));
