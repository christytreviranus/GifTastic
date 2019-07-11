//Create an array with topics 
const topics = ["bill nye", "asteroids", "computer", "chemistry", "space", "mathematics", "physics", "technology", "astronomy", "biology"];

//Create a variable for the button that the user can create and then click to display gifs from the GIPHY API.
let scienceBtn;

//Create variable for gif image.
let scienceImage;

function createButtons() {
    $("#user-input").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i=0; i < topics.length; i++) {
      //Create variable for button.
      var scienceBtn = $("<button>");
      //Add topic's name to button.
      scienceBtn.text(topics[i]);
      //Assign a data attribute to each button.
      scienceBtn.attr("data-name", topics[i]);
      scienceBtn.attr("id", "science-btn");
      //Add a class of science-btn to each button as well as other classes to change the color, padding, and margin of the button.
      scienceBtn.addClass("btn btn-outline-secondary p-2 mr-2 mb-3");
      //Append to card body in premade button section
      $("#pmButtons").append(scienceBtn);
    }
  }

function displayScienceImages() {
    //Empty columns each time button is click to start fresh
    $("#results-col1").empty();
    $("#results-col2").empty();
    $("#results-col3").empty();
    
    scienceBtn = $(this).attr("data-name");
    //construct URL to search Giphy
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    scienceBtn + "&api_key=qHkF94Kee8Ui9FxZWhkvIhdW6o0GivEk&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      //AJAX promise to return data back to page
      .then(function(response) {
        //Debug
        console.log(response);
        const results = response.data;
        
        for (i = 0; i < results.length; i++) {

            //Create div element to hold gif image. 
            const gifDiv = $("<div class='item'>");

            //Save results[i].rating property. Store in rating variable.
            const rating = results[i].rating;

            //Display rating of gif.
            let p = $("<p>").text("Rating: " + rating);

            //Need to give each gif/image some attributes so that the user can play and pause a gif on demand.
            scienceImage = $("<img>");
            scienceImage.attr("src", results[i].images.fixed_height_still.url);
            scienceImage.attr("img-still", results[i].images.fixed_height_still.url);
            scienceImage.attr("img-animate", results[i].images.fixed_height.url);
            scienceImage.attr("img-state", "still");
            scienceImage.addClass ("img-fluid gif border border-primary");

            //Prepend rating paragraph to the div that was created to hold the gif image.
            gifDiv.prepend(p);
            //Prepend gif image to the div that was created to hold the gif image.
            gifDiv.prepend(scienceImage);

            //Giphy distribution in divs
            if (i >= 0 && i < 3) {
              $("#results-col1").append(gifDiv);
            }
            else if (i >= 3 && i < 7) {
              $("#results-col2").append(gifDiv);
            }
            else {
              $("#results-col3").append(gifDiv);
            }
        }

        //When the user clicks a gif in the search results
        $(".gif").on("click", function() {
          // Set image state
          let state = $(this).attr("img-state");
          
          if (state === "still") {
            $(this).attr("src", $(this).attr("img-animate"));
            $(this).attr("img-state", "animate");
          } 
          else {
            $(this).attr("src", $(this).attr("img-still"));
            $(this).attr("img-state", "still");
          }
        });

      });
}

  //Form Add button
  $("#submit-button").on("click", function(event){
    event.preventDefault();
    //Convert user input to lower case and then clear search field
    let userInput = $("#user-input").val().toLowerCase();
    $("#user-input").val("");
    //If user entry is already displayed notify user
    if (topics.indexOf(userInput) > -1) {
        alert(userInput + "has already been added!");
    }
    //Prevent creating an empty button on null/blank submit
    else if (userInput === "" || userInput === null){
        return false;
    }
    //Otherwise go ahead and add the button
    else if (topics.indexOf(userInput) === -1) {
        topics.push(userInput);
        console.log(topics);
        createButtons();
    }
  });

  //Call createButtons() to display initial buttons.
  createButtons();

//Create click event for all elements with a class of science-btn.
$(document).on("click", "#science-btn", displayScienceImages);