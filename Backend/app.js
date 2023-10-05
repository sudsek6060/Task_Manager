require("dotenv").config()
const express = require("express");
const connectToDb = require("./Config/db");
const authRouter = require("./Routes/authRoutes")
const taskRouter = require('./Routes/taskRoutes')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

connectToDb();
app.use("/", authRouter)
app.use("/", taskRouter)
module.exports = app;