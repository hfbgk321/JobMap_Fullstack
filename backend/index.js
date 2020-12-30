const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const router = require("express").Router();

app.use(cors());
app.use(express.json());
//register and login routes

app.use("/auth",require("./routes/jwtAuth"));
app.use("/dashboard",require("./routes/dashboard"));
app.listen(5000, () => {
    console.log("server has started on port 5000");
})