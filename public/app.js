$(document).ready(function() {
  $('.parallax').parallax();


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
      console.log(data); 
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
          <a id="save" class="waves-effect waves-light btn red lighten-2"><i class="material-icons right">save</i>Save Article</a>
        `);

        card.append(cardContent, cardAction); 
        col.append(card);
        row.append(col); 
        $(".articles").append(row); 
      });
    });
  }); 

  // TODO: Add scraped articles to page with button to save article
  $('a#save').on("click", function() {
    let thisId = $(this).attr("data-id");
    $.ajax({
      method: "POST", 
      url: "/articles/" + thisId,
    }).then(function(data) { 
      console.log(data)
    })
  }); 
  // TODO: Saved Articles page- GET all saved articles with buttons to access article notes and delete from saved

  
  // TODO: GET & PUT article notes
  





}); 




