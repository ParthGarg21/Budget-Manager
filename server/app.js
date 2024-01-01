// edit the environment variables from config.env file
const dotenv = require("dotenv");
dotenv.config();

// npm packages
const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

// utils
const authenticator = require("./authenticator");
const url = require("./getURL");

// routers
const userRouter = require("./routes/UserRoutes");
const budgetRouter = require("./routes/BudgetRoutes");
const expenseRouter = require("./routes/ExpenseRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://budget-manager-client.onrender.com",
  })
);
// app.use(cookieParser());

// router middleware
app.use("/users", userRouter);
app.use("/budgets", authenticator, budgetRouter);
app.use("/expenses", authenticator, expenseRouter);

// connect to DB and start server
const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to DB");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
