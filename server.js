// Dependencies
const express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Require request and cheerio. This makes the scraping possible
const request = require("request");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));




// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});