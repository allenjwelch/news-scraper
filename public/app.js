$(document).ready(function() {
  $('.parallax').parallax();

  $('#home').on('click', function() {
    $(".articles").empty(); 
    $(".articles").html(`<h5 class="noArt cyan darken-3 white-text center">You do not have any articles...<br>Click the <i>Scrape News</i>  button above to view articles</h5>`); 
  }); 


  // Click for scraping Articles (send Toast)
  $('a#scrapeBtn').on("click", function() {
    M.toast({html: '20 Articles Scraped!'})
    $(".articles").empty(); 
    $.ajax({
      method: "GET", 
      url: "/scrape", 
    }).then(function(data) { 
    // $.get("/scrape", function(data) {
      // For each one
      let reducedData = [];
      for (i=10; i < 31; i++) {
        reducedData.push(data[i]);
      };
      reducedData.forEach((article) => {
        if (article.summary === undefined) {
          article.summary = 'Summary Unavailable'; 
        }
        let row = $(`<div class="row">`); 
        let col = $(`<div class="col l12 m12 s12">`); 
        let card = $(`<div class="card cyan darken-3 white-text">`); 
        let cardContent = $(`<div class="card-content">`); 
        let cardAction = $(`<div class="card-action teal lighten-4">`); 

        cardContent.append(`
          <span class="card-title">${article.title}</span>
          <p>${article.summary}</p>
        `);

        cardAction.append(`
          <a class="orange-text" href="${article.link}" target="_blank">Read More</a>
          <a id="save" class="waves-effect waves-light btn"><i class="material-icons right">save</i>Save Article</a>
        `);

        card.append(cardContent, cardAction); 
        col.append(card);
        row.append(col); 
        $(".articles").append(row); 
      });
    });
  }); 

  // Add scraped articles to page with button to save article
  $('.articles').on("click", 'a#save', function() {
    M.toast({html: 'Articles Saved!'})
    let addTitle = $(this).parent().siblings().children('span').text(); 
    let addSummary = $(this).parent().siblings().children('p').text(); 
    let addLink = $(this).siblings().attr('href'); 
    let addArticle = {
      title: addTitle, 
      summary: addSummary,
      link: addLink
    };
    // console.log(addArticle); 

    $.ajax({
      method: "POST", 
      url: "/articles",
      data: addArticle
    }).then(function(data) { 
      // console.log(data); 
      // console.log('article added')
    }).catch(function(err) {
      return res.json(err);
    });
  }); 

  // Saved Articles page- GET all saved articles with buttons to access article notes and delete from saved
  $('#savedArticles').on('click', function() {
    loadSavedArticles();
  })
  
  
  // GET, POST, & PUT article notes
  $('.articles').on("click", 'a#note', function() {
    // console.log('click'); 
    $(".notes").empty();
    let thisId = $(this).attr("data-id");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    }).then(function(data) {
      // console.log(data);
      $(".notes").append(`<h5 id='noteTitle' class='center-align hide-on-med-and-down'> ${data[0].title} </h5>`);
      $(".notes").append(`<input id='titleInput' name='title' placeholder='Note Title'>`);
      $(".notes").append("<textarea id='bodyInput' name='body'></textarea>");
      $(".notes").append(`<a data-id=${data[0]._id} id='savenote' class="waves-effect waves-light right btn-small"><i class="material-icons right">save</i>Save Note</a>`);
      
      // If there's a note in the article
      if (data[0].note) {
        $("#titleInput").val(data[0].note.title);
        $("#bodyInput").val(data[0].note.body);
      }
    });

    $('.notes').on("click", 'a#savenote', function() {
      let titleInput = $("#titleInput").val(); 
      let bodyInput = $("#bodyInput").val(); 
      let newNote = {
        title: titleInput,
        body: bodyInput,
      }
      // console.warn(newNote); 

      let thisId = $(this).attr("data-id");
      $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: newNote
      }).then(function(data) {
          // console.log(data);
          $(".notes").empty();
      }).catch(function(err) {
          return res.json(err);
      });
      $("#titleinput").val("");
      $("#bodyinput").val("");
    }); 


  }); 

  // Delete article from saved
  $('.articles').on("click", 'a#delete', function() {
    console.log('click'); 
    let thisId = $(this).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/articles/" + thisId
    }).then(function(data) {
      loadSavedArticles();
    }); 
  }); 


  function loadSavedArticles() {
    $(".articles").empty(); 
    $.ajax({
      method: "GET", 
      url: "/articles"
    }).then(function(data) { 
      // console.log(data); 
      data.forEach((article) => {
        if (article.summary === undefined) {
          article.summary = 'Summary Unavailable'; 
        }
        let row = $(`<div class="row">`); 
        let col = $(`<div class="col l12 m12 s12">`); 
        let card = $(`<div class="card cyan darken-3 white-text">`); 
        let cardContent = $(`<div class="card-content">`); 
        let cardAction = $(`<div class="card-action teal lighten-4">`); 

        cardContent.append(`
          <span class="card-title">${article.title}</span>
          <p>${article.summary}</p>
        `);

        cardAction.append(`
          <a class="orange-text" href="${article.link}" target="_blank">Read More</a>
          <a id="note" data-id="${article._id}" class="waves-effect waves-light btn lime darken-2 white-text"><i class="material-icons right">note_add
          </i>Add Note</a>
          <a id="delete" data-id="${article._id}" class="waves-effect waves-light btn red darken-2 white-text"><i class="material-icons right">delete
          </i>Delete Article</a>
        `);

        card.append(cardContent, cardAction); 
        col.append(card);
        row.append(col); 
        $(".articles").append(row); 
      });
    
    }).catch(function(err) {
      return res.json(err);
    });
  };

}); 




