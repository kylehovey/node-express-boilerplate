const express = require("express");
const router = express.Router();

/* GET home page. */
module.exports = ({ title }) => {
  router.get("/", (req, res, next) => {
    res.render("index", { title });

    next();
  });

  return router;
};
