// Creating a namespace to store code
const poke = {};

// train of thought 
// user submits form 
// user val is received from the input 
// user val passed to the api location 
// information is then added to the first dom box
// upser types in name 
// value added ot second dom box 



// let pokeName = 'charizard' 
// change to userinput ^
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
        dataType: 'json',
        // error handling after promise lesson
    }).then((result) => {
        // gives us the url of the icon
        poke.pokeImg = result.sprites.front_default
        console.log(result.sprites.front_default)

        // this will give us the first type of the pokemon
        poke.type1 = result.types[0].type.name
        console.log(poke.type1)
    
        // this will give us the second type of the pokemon
        poke.type2 = result.types[1].type.name
        console.log(poke.type2)

        // $("#0").html(`
        // <div class="imageWrapper">
        //     <p>${poke.type1} ${poke.type2}</p>
        //     <img src="${poke.pokeImg}" alt="">
        // </div>
        // `)

        let i = 0;
        for (i = 0; i <= 5; i++) {
            $(`#${i}`).html(`
            <div class="${i}">
                <p>${poke.type1} ${poke.type2}</p>
                <img src="${poke.pokeImg}" alt="">
            </div>
            `)
        }
    })
}



// this code is not working for some reasons ///// debug tomorrow 
// poke.addToDOM = (index) => {
//     $(`#${index}`).html(`
//     <div class="imageWrapper">
//         <p>${poke.type1} ${poke.type2}</p>
//         <img src="${poke.pokeImg}" alt="">
//     </div>
//     `)
// }

poke.getPictures = () => {
    $(".imageWrapper1").append(
        `<img src="${poke.pokeImg}" alt="">`
    )
}
/////// debug tomorrow //

    // $('#0 img').attr('src', poke.pokeImg)
    // adds image to the first empty box on the dom 
//     $(`button`).on('click', function () {
//         $(` img`).attr('src', "")
//     })

   

//     // poke.deletePictures =
//     poke.getPictures(0)

// })


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
    // poke.getAPI('pikachu');
    // poke.addToDOM(0)
    poke.scrollToMain();
}

// Document ready function
$(function () {
    poke.init();
});

