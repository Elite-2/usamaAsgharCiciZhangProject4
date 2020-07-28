// Creating a namespace to store code
const poke = {};

// Organizing init function to pass to document ready
poke.init = () => {
    poke.getAPI('pikachu')
    // poke.addToDOM(0, "fire", "water")
}

// Document ready function
$(function () {
    poke.init();
});


// let pokeName = 'charizard' 
// change to userinput ^

poke.getAPI = (pokeName) => {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
        method: 'GET',
        dataType: 'json',
        error: console.log('invalid input please check spelling')
        // error handling after promise lesson
    }).then((result) => {
        const returnedVal = result.types[0].type.name
        console.log(returnedVal)
        // this will give us the first type of the pokemon
        // returns bug
        console.log(result.types[1].type.name)
        // this will give us the second type of the pokemon
        // returns fire
        console.log(result.sprites.front_default)
        // gives us the icon
        // returns https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/637.png
        poke.pokeImg = result.sprites.front_default
    })
}

// this code is not working for some reasons ///// debug tomorrow 
poke.addToDOM = (index, type1, type2) => {
    $(`#${index}`).html(`<p>${type1} ${type2}</p>`)
    poke.getPictures(index)
}

poke.getPictures = (index) => {
    $(`#${index} img`).attr('src', poke.pokeImg)
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


// // Smooth Scroll for start button 
// poke.scrollToMain = () => {
//     $(".start").on('click', function (event) {
//         // Overriding default behavior
//         event.preventDefault();
//         // Store this.hash in a variable called hash
//         // hash is used to reference the anchor part of a URL (the 'id' in this case)
//         const hash = this.hash;
//         $('html, body').animate({
//             scrollTop: $(hash).offset().top
//         }, 900);
//     });
// };