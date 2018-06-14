$(document).ready(function() {
  $('.parallax').parallax();



  // TODO: Click for scraping Articles (send Toast)
  // M.toast({html: 'I am a toast!'})
  $('#scrapeBtn').on("click", function() {
    console.log('clicked'); 
    $.getJSON("/articles", function(data) {
      // For each one
      console.log(data); 
      data.forEach((article) => {
        let row = $(`<div class="row">`); 
        let col = $(`<div class="col l12 m12 s12">`); 
        let card = $(`<div class="card teal lighten-3">`); 
        let cardContent = $(`<div class="card-content">`); 
        let cardAction = $(`<div class="card-action cyan lighten-5">`); 

        cardContent.append(`
          <span class="card-title">Article Title</span>
          <p>Article Summary. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores culpa asperiores voluptates quos rerum officiis dolorum facilis nihil pariatur consectetur.</p>
        `);

        cardAction.append(`
          <a href="#">Read More</a>
        `);

        card.append(cardContent, cardAction); 
        col.append(card);
        row.append(col); 
        $(".articles").append(row); 

        // `)
        // $(".articles").append(`
        //   <div class="row">
        //   <div class="col l12">
        //   <div class="card teal lighten-3">
        //   <div class="card-content">
        //   <div class="card-action teal lighten-5">
        // `); 
        // $("card-content").append(`
        //   <span class="card-title">Article Title</span>
        //   <p>Article Summary. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores culpa asperiores voluptates quos rerum officiis dolorum facilis nihil pariatur consectetur.</p>
        // `);
        // $("card-action").append(`
        //   <a href="#">Read More</a>
        // `); 

      })
      // for (var i = 0; i < data.length; i++) {
      //   // Display the apropos information on the page
      //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      // }
    });
  }); 

  // TODO: GET scraped articles


  // TODO: Add scraped articles to page with button to save article


  // TODO: Saved Articles page- GET all saved articles with buttons to access article notes and delete from saved

  
  // TODO: GET & PUT article notes
  





}); 




