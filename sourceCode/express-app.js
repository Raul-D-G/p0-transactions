const express = require("express");
const cors = require("cors");

const transactionsRouter = require("./api/transactions.router");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //router
  app.use("/api/transactions", transactionsRouter);
};
