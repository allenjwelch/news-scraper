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
    let results = [];
    $("div.story-body").each(function(i, element) {
      
      let title = $(element).children().children().children("h2.headline").text().trim();
      let summary = $(element).children().children().children("p.summary").text();
      let link = $(element).children().attr("href");
      results.push({
        title: title,
        summary: summary,
        link: link
      });      
      console.log(results); 
      // Create a new Article using the `result` object built from scraping
      // db.Article.create(result)
      //   .then(function(dbArticle) {
      //     console.log(dbArticle);
      //   })
      //   .catch(function(err) {
      //     return res.json(err);
      //   });
    });
    res.json(results);
  })
});

// Create a new Article using the `result` object built from scraping
app.post("/articles", function(req, res) {
  db.Article.create(req)
    .then(function(dbArticle) {
      console.log(dbArticle);
    })
    .catch(function(err) {
      return res.json(err);
    });
})  

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  db.Article.find({})
  .then(function(dbArticle) {
    res.json(dbArticle); 
  })
  .catch(function(err) {
    res.json(err); 
  })
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  db.Article.find({ _id: req.params.id })
  .populate("note")
  .then(function(dbArticle) {
    res.json(dbArticle)
  })
  .catch(function(err) {
    res.json(err); 
  })
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});







// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});