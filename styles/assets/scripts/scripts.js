// Namespace to store code
const poke = {};

// Placement array that keeps track of what boxes are available
poke.placeArray = [0, 1, 2, 3, 4, 5];

// Function to allow a smooth scroll from the header to the character selection screen
poke.scrollToMain = () => {
    $(".start").on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("main").offset().top
        }, 900);
    });
};

// Funtion to store the user's input into a variable
poke.getInputAndClear = () => {
    poke.userInput = $('input').val().toLowerCase()
    $('input').val("")
};

// API call to the poke API
// poke.userInput will be the argument passed to the parameter below when the poke.getAPI function is called
poke.getAPI = (pokeName) => {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
        method: 'GET',
        dataType: 'json'
    }).then((result => {
        poke.pokeImg = result.sprites.front_default
        poke.type1 = result.types[0].type.name

        // A conditional ternary operator that checks if the chosen pokemon has 1 or 2 types
        result.types.length < 2 ? poke.type2 = "" : poke.type2 = result.types[1].type.name

        poke.placeArray.sort()
        poke.addToFirstAvailableSpot()
        poke.placeArray.shift()
        poke.removePoke()
    }
    // If the user makes a spelling mistake when entering a pokemon name they will be alerted with the below message
    )).fail(failed => {
        alert("Not a valid pokemon name!")
    })
};

// Function that will run when user types in a pokemon name and presses 'Enter'
poke.listenerFunction = () => {
    $("form").submit((event) => {
        event.preventDefault()
        poke.getInputAndClear()
        poke.getAPI(poke.userInput)
    })
};

// Function that appends pokemon types and image onto the DOM based on user input
poke.addToFirstAvailableSpot = () => {
    $(`#${poke.placeArray[0]}`).html(`
    <div class="${poke.placeArray[0]}">
        <h2>${poke.type1} ${poke.type2}</h2>
        <img src="${poke.pokeImg}" alt="icon of ${poke.userInput}">
    </div>
    <button class="remove button">remove</button>
    `)
};

// A function to remove a character from the team; there's a remove button under each character box
// Clicking the remove button will remove the character from the corresponding character box
// This function ensures that the box that is empty after clicking remove will be the next box that will fill after a user reinputs a character
poke.removePoke = () => {
    $(".remove").on('click', function () {
        poke.deletedID = $(this).parent().attr("id")
        poke.deletedLocation = Number(poke.deletedID)
        $(this).parent().empty().html(
            `<h2>Pokemon</h2>
            <div class="imageWrapper">
                <img src="" alt="">
            </div>
            <button class="remove button">remove</button>`) 
        poke.placeArray.push(poke.deletedLocation);
    })
};

// The init function that will be passed to the document ready function
poke.init = () => {
    poke.listenerFunction()
    poke.scrollToMain();
};

// Document ready function
$(function () {
    poke.init();
});