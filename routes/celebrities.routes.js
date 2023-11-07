const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js");

router.get("/", async (req, res, next) => {
  try {
    const response = await Celebrity.find().select({
      name: 1,
    });
    res.render("celebrities/celebrities.hbs", { allCelebrities: response });
  } catch (error) {}
});
// GET "/celebrities/create" muestra un formulario para crear una celebridad

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

// POST "/celebrities/create" manda la info del usuario y crea una celebridad en la DB

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
