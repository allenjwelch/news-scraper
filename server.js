// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// ==== Routes ====
app.get('/scrape', function(req, res) {
  request("https://www.nytimes.com/section/us", function(error, response, html) {
    let $ = cheerio.load(html);
    let result = {};
    $("div.story-body").each(function(i, element) {
      
      result.title = $(element).children().children().children("h2.headline").text().trim();
      result.summary = $(element).children().children().children("p.summary").text();
      result.link = $(element).children().attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });
    res.json("Scrape Complete");
  })
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})
  .then(function(dbArticle) {
    res.json(dbArticle); 
  })
  .catch(function(err) {
    res.json(err); 
  })
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});