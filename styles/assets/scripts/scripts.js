// Train of thought: ------------------------------------------------------------------------------------------------ 
// user submits form 
// user val is received from the input 
// user val passed to the api location 
// information is then added to the first dom box
// upser types in name 
// value added to second dom box and so on
// if user wishes to remove a selection they can click the remove button under each box
// ------------------------------------------------------------------------------------------------------------------

// Creating a namespace to store code
const poke = {};

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
        
        // ternary operator that checks if the array length under types is 2 or less. If yes let type2 be an empty string, if no, let type2 be the 2nd type of the pokemon
        result.types.length < 2 ? poke.type2 = "" : poke.type2 = result.types[1].type.name

        let i = 0;
        for (i = 0; i <= 5; i++) {
            if (i == 0) {
                $('#0').html(`
                <h2>Pokemon</h2>
                <div class="0">
                    <p>${poke.type1} ${poke.type2}</p>
                    <img src="${poke.pokeImg}" alt="">
                    <button class="remove button">remove</button>
                </div>
                `)
                console.log(i);
                poke.removeCharacter(i);
                return false;
            } else if (i == 1) {
                $('#1').html(`
                <div class="1">
                    <p>${poke.type1} ${poke.type2}</p>
                    <img src="${poke.pokeImg}" alt="">
                    <button class="remove button">remove</button>
                </div>
                `)
                console.log(i);
                return false;
            } else if (i == 2) {
                $('#2').html(`
                <div class="2">
                    <p>${poke.type1} ${poke.type2}</p>
                    <img src="${poke.pokeImg}" alt="">
                    <button class="remove button">remove</button>
                </div>
                `)
                console.log(i);
                return false;
            } else if (i == 3) {
                $('#3').html(`
                <div class="3">
                    <p>${poke.type1} ${poke.type2}</p>
                    <img src="${poke.pokeImg}" alt="">
                    <button class="remove button">remove</button>
                </div>
                `)
                console.log(i);
                return false;
            } else if (i == 4) {
                $('#4').html(`
                <div class="4">
                    <p>${poke.type1} ${poke.type2}</p>
                    <img src="${poke.pokeImg}" alt="">
                    <button class="remove button">remove</button>
                </div>
                `)
                console.log(i);
                return false;
            } else if (i == 5) {
                $('#5').html(`
                <div class="5">
                    <p>${poke.type1} ${poke.type2}</p>
                    <img src="${poke.pokeImg}" alt="">
                    <button class="remove button">remove</button>
                </div>
                `)
                console.log(i);
                return false;
            }
        }
    }
    ))
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

// Organizing init function to pass to document ready
poke.init = () => {
    poke.listenerFunction()
    poke.scrollToMain();
}

// Document ready function
$(function () {
    poke.init();
});

