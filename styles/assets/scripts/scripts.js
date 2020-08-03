// Namespace to store code
const poke = {};

// Placement array that keeps track of what boxes are available
poke.placeArray = [0, 1, 2, 3, 4, 5]

poke.getInputAndClear = () => {
    poke.userInput = $('input').val().toLowerCase()
    $('input').val("")
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

poke.getAPI = (pokeName) => {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
        method: 'GET',
        dataType: 'json'
    }).then((result => {
        poke.pokeImg = result.sprites.front_default
        poke.type1 = result.types[0].type.name
        result.types.length < 2 ? poke.type2 = "" : poke.type2 = result.types[1].type.name
        poke.placeArray.sort()
        poke.addToFirstAvailableSpot()
        poke.placeArray.shift()
        poke.removePoke()
    }
    )).fail(failed => {
        alert("Not a valid pokemon name!")
    })
}

poke.removePoke = () => {
    $(".remove").on('click', function () {
        poke.deletedID =$(this).parent().attr("id")
        poke.deletedLocation = Number(poke.deletedID)
        $(this).parent().empty().html(
            `<h2>Pokemon</h2>
            <div class="imageWrapper">
                <img src="" alt="">
            </div>
            <button class="remove button">remove</button>`) 
        poke.placeArray.push(poke.deletedLocation)
    })
}

poke.listenerFunction = () => {
    $("form").submit((event) => {
        event.preventDefault()
        poke.getInputAndClear()
        poke.getAPI(poke.userInput)
    })
}

poke.scrollToMain = () => {
    $(".start").on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("main").offset().top
        }, 900);
    });
};

poke.init = () => {
    poke.listenerFunction()
    poke.scrollToMain();
}

// Document ready function
$(function () {
    poke.init();
});

