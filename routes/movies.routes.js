const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

// GET "/movies" lista de películas creadas

router.get("/", async (req, res, next) => {
  try {
    const response = await Movie.find().select({
      title: 1,
    });
    res.render("movies/movies.hbs", { allMovies: response });
    console.log(response);
  } catch (error) {
    next(error);
  }
});

// GET "/movies/create" formulario para crear pelicula

router.get("/create", async (req, res, next) => {
  try {
    const response = await Celebrity.find().select({ name: 1 });
    res.render("movies/new-movie.hbs", { allCelebrities: response });
  } catch (error) {
    next(error);
  }
});

// POST "/movies/create" enviar data del formulario y crear pelicula en la DB

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET "/movies/:id" enviar al usuario a los detalles de la pelicula seleccionada

router.get("/:id", async (req, res, next) => {
  try {
    const response = await Movie.findById(req.params.id).populate("celebrity");
    res.render("movies/movie-details.hbs", {
      oneMovie: response,
    });
  } catch (error) {
    next(error);
  }
});

//
module.exports = router;
