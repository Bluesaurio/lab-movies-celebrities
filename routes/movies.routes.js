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
    const response = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details.hbs", {
      oneMovie: response,
    });
  } catch (error) {
    next(error);
  }
});

// POST "/movies/:id/delete" borra una película por su ID y redirecciona al usuario

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET "/movies/:id/edit" formulario para editar pelicula y redirige a detalles de la pelicula

router.get("/:id/edit", async (req, res, next) => {
  try {
    const movieToEdit = await Movie.findById(req.params.id);
    //const celebCast = Celebrity.find().populate("cast");
    res.render("movies/edit-movie.hbs", movieToEdit);
    console.log(movieToEdit);
  } catch (error) {
    next(error);
  }
});

//
module.exports = router;
