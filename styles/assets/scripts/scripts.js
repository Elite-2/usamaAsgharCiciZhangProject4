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
        result.types.length < 2 ? poke.type2 = "" : poke.type2 = result.types[1].type.name
        poke.placeArray.sort()
        $(`#${poke.placeArray[0]}`).html(`
                 <div class="${poke.placeArray[0]}">
                     <h2>${poke.type1} ${poke.type2}</h2>
                     <img src="${poke.pokeImg}" alt="icon of ${poke.userInput}">
                </div>
                 <button class="remove button">remove</button>
                 `)
        poke.placeArray.shift()
        poke.removePoke()
    }
    ))
}

poke.removePoke = () => {
    $(".remove").on('click', function () {
        poke.deletedID =$(this).parent().attr("id")
        console.log(typeof poke.deletedID)
        poke.deletedLocation = Number(poke.deletedID)
        console.log(typeof poke.deletedLocation, poke.deletedLocation)
        $(this).parent().empty().html(
            `<h2>Pokemon</h2>
            <div class="imageWrapper">
                <img src="" alt="">
            </div>
            <button class="remove button">remove</button>`) 
        poke.placeArray.push(poke.deletedLocation)
    })
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
    // poke.removePoke()
}

// Document ready function
$(function () {
    poke.init();
});

