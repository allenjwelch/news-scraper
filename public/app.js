$(document).ready(function() {
  $('.parallax').parallax();


  // TODO: Click for scraping Articles (send Toast)
  $('#scrapeBtn').on("click", function() {
    M.toast({html: '50 Articles Scraped!'})
    $(".articles").empty(); 
    $.get("/articles", function(data) {
      // For each one
      console.log(data); 
      let reducedData = [];
      for (i=100; i < 151; i++) {
        reducedData.push(data[i]);
      };
      reducedData.forEach((article) => {
        if (article.summary === undefined) {
          article.summary = 'Summary Unavailable'; 
        }
        let row = $(`<div class="row">`); 
        let col = $(`<div class="col l12 m12 s12">`); 
        let card = $(`<div class="card teal lighten-3">`); 
        let cardContent = $(`<div class="card-content">`); 
        let cardAction = $(`<div class="card-action cyan lighten-4">`); 

        cardContent.append(`
          <span class="card-title">${article.title}</span>
          <p>${article.summary}</p>
        `);

        cardAction.append(`
          <a class="orange-text" href="${article.link} target="_blank">Read More</a>
          <a class="waves-effect waves-light btn red lighten-2"><i class="material-icons right">save</i>Save Article</a>
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

    });
  }); 

  // TODO: GET scraped articles


  // TODO: Add scraped articles to page with button to save article


  // TODO: Saved Articles page- GET all saved articles with buttons to access article notes and delete from saved

  
  // TODO: GET & PUT article notes
  





}); 




