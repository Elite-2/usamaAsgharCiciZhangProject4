// Creating a namespace to store code
const poke = {};

// train of thought 
// user submits form 
// user val is received from the input 
// user val passed to the api location 
// information is then added to the first dom box
// upser types in name 
// value added ot second dom box 


poke.listenerFunction = () => {
    $("form").submit((event) => {
        event.preventDefault()
        poke.getInputAndClear()
        poke.getAPI(poke.userInput)
    })
}

// getInputAndClear takes the user input and stores it into poke.UserInput then clears the user input box
poke.getInputAndClear = () => {
    poke.userInput = $('input').val()
    $('input').val("")
}

// everytime the api call is successful it adds to the pokecounter if remove is pressed it decreases the counter by 1
poke.counter = 0
poke.placeArray = [0, 1, 2, 3, 4, 5]
// getAPI takes the user input sends an API request then it comes back with the type 1, type 2 and spite of the pokemon user has inputted
poke.getAPI = (pokeName) => {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
        method: 'GET',
        dataType: 'json'
        // error handling after promise lesson
    }).then((result => {
        // gives us the url of the icon
        poke.pokeImg = result.sprites.front_default
        // saves the first type of the pokemon to a variable 
        poke.type1 = result.types[0].type.name
        
        // ternary operator that checks if the array length under types is 2 or less. If yes let type2 be an empty string, if no, let type2 be the 2nd type of the pokemone
        result.types.length < 2 ? poke.type2 = "" : poke.type2 = result.types[1].type.name

        poke.counter ++
        console.log(poke.counter)
        // CC Note: DO I NEED TO PUT IN A CHECK FOR MAXIMUM NUMBER 6? 
      
        $(`#${poke.placeArray[0]}`).html(`
                 <div class="${poke.placeArray[0]}">
                     <p>${poke.type1} ${poke.type2}</p>
                     <img src="${poke.pokeImg}" alt="icon of ${poke.userInput}">
                     <button class="remove button">remove</button>
                 </div>
                 `)
        poke.placeArray.shift()
    }
    ))
}

/////////// Remove Button Code /////////
// Creating a click event to remove user selection
poke.removeCharacter = (box) => {
    $(".remove").on('click', function (event) {
        // Overriding default behavior
        event.preventDefault();
        $(`#${box}`).html(`
        <h2>Pokemon</h2>
        <div class="imageWrapper">
            <img src="" alt="">
        </div>
        <button class="remove button">remove</button>
        `)
    });
}



// Smooth Scroll for start button 
poke.scrollToMain = () => {
    $(".start").on('click', function (event) {
        // Overriding default behavior
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("main").offset().top
        }, 900);
    });
};

// Organizing init function to pass to document ready
poke.init = () => {
    poke.listenerFunction()
    poke.scrollToMain();
}

// Document ready function
$(function () {
    poke.init();
});

