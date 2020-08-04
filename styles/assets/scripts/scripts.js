// Namespace to store code
const poke = {};

// Setting counters for all pokemon types
let normal = 0;
let fighting = 0;
let flying = 0;
let poison = 0;
let ground = 0;
let rock = 0;
let bug = 0;
let ghost = 0;
let steel = 0;
let fire = 0;
let water = 0;
let grass = 0;
let electric = 0;
let psychic = 0;
let ice = 0;
let dragon = 0;
let dark = 0;
let fairy = 0;

// Placement array that keeps track of what boxes are available
poke.placeArray = [0, 1, 2, 3, 4, 5];
// An empty array that will have pokemon types pushed to it in order to calculate and display pokemon team strength
poke.teamAbilities = [];

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
<<<<<<< HEAD
}

poke.addToFirstAvailableSpot = () => {
    $(`#${poke.placeArray[0]}`).html(`
                 <div class="${poke.placeArray[0]} addedImage">
                     <h2>${poke.type1} ${poke.type2}</h2>
                     <img src="${poke.pokeImg}" alt="icon of ${poke.userInput}">
                </div>
                 <button class="remove button">remove</button>
                 `)
}
=======
};
>>>>>>> fe23c63237b8baea08dbb7e0802ef1ed94b39c1d

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
    // Adds pokemon types to array poke.teamAbilities
    poke.teamAbilities.push(poke.type1, poke.type2);
    // An if statement that ensures that the length of the array is no longer than 12
    if (poke.teamAbilities.length > 12) poke.teamAbilities.length = 12;
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

// A function that calculates and displays the strengths of the user's chosen pokemon
poke.calculateResult = () => {
    $(".resultButton").on('click', function () {
        // Only run the for loop if poke.teamAbilities.length is 12
        if (poke.teamAbilities.length = 12) {
            // A for loop that runs through the poke.teamAbilites array and increases the counter of the matching type
            for (i = 0; i <= poke.teamAbilities.length; i++) {
                if (poke.teamAbilities[i] === "normal") {
                    normal++;
                } else if (poke.teamAbilities[i] === "fighting") {
                    fighting++;
                } else if (poke.teamAbilities[i] === "flying") {
                    flying++;
                } else if (poke.teamAbilities[i] === "poison") {
                    poison++;
                } else if (poke.teamAbilities[i] === "ground") {
                    ground++;
                } else if (poke.teamAbilities[i] === "rock") {
                    rock++;
                } else if (poke.teamAbilities[i] === "bug") {
                    bug++;
                } else if (poke.teamAbilities[i] === "ghost") {
                    ghost++;
                } else if (poke.teamAbilities[i] === "steel") {
                    steel++;
                } else if (poke.teamAbilities[i] === "fire") {
                    fire++;
                } else if (poke.teamAbilities[i] === "water") {
                    water++;
                } else if (poke.teamAbilities[i] === "grass") {
                    grass++;
                } else if (poke.teamAbilities[i] === "electric") {
                    electric++;
                } else if (poke.teamAbilities[i] === "psychic") {
                    psychic++;
                } else if (poke.teamAbilities[i] === "ice") {
                    ice++;
                } else if (poke.teamAbilities[i] === "dragon") {
                    dragon++;
                } else if (poke.teamAbilities[i] === "dark") {
                    dark++;
                } else if (poke.teamAbilities[i] === "fairy") {
                    fairy++;
                }
            }
            // Displays / appends the results of the user's character selections to the DOM
            $(".resultSectionContainer").html(`
                <h2>team strenghts</h2>
                <div class="resultSection">
                    <h3>normal: ${normal}</h3>
                    <h3>fighting: ${fighting}</h3>
                    <h3>flying: ${flying}</h3>
                    <h3>poison: ${poison}</h3>
                    <h3>ground: ${ground}</h3>
                    <h3>rock: ${rock}</h3>
                    <h3>bug: ${bug}</h3>
                    <h3>ghost: ${ghost}</h3>
                    <h3>steel: ${steel}</h3>
                    <h3>fire: ${fire}</h3>
                    <h3>water: ${water}</h3>
                    <h3>grass: ${grass}</h3>
                    <h3>electric: ${electric}</h3>
                    <h3>psychic: ${psychic}</h3>
                    <h3>ice: ${ice}</h3>
                    <h3>dragon: ${dragon}</h3>
                    <h3>dark: ${dark}</h3>
                    <h3>fairy: ${fairy}</h3>
                </div>
            `);
        }
        // Disables the result button after one click
        $(this).prop('disabled', true);
    })
};

// The init function that will be passed to the document ready function
poke.init = () => {
    poke.listenerFunction()
    poke.scrollToMain();
    poke.calculateResult();
};

// Document ready function
$(function () {
    poke.init();
});