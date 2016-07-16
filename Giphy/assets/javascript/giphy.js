$(function() {
    populateButtons(gifs, 'gifButton', '#gifButtons');
});

var gifs = ["Pickachu", "mankey", "squirtle", "charmander", "Magnemite", "Magickarp", "snorlax", "ditto", "sonic", "Eggman", "Space Invaders", "hedgehog", "salamander", "frogger"];


function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

$(document).on('click', '.gifButton', function() {
    $('#gifs').empty();
    $('.gifButton').removeClass('active');
    $(this).addClass('active');

    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
    var randomURL = "http://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&tag=oops" + "&api_key=dc6zaTOxFJmzC&limit=10"
    $.ajax({ url: queryURL, method: 'GET' })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="gif-item">')

                var rating = results[i].rating;

                var p = $('<p>').text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var gifImage = $('<img>');
                gifImage.attr('src', still);
                gifImage.attr('data-still', still);
                gifImage.attr('data-animate', animated);
                gifImage.attr('data-state', 'still')
                gifImage.addClass('gifImage');
                gifDiv.append(p)
                gifDiv.append(gifImage)

                $('#gifs').append(gifDiv);
            }

        });
});

$(document).on('click', '.gifImage', function() {
    var state = $(this).attr('data-state');

    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addgif').on('click', function() {
    var newgif = $('input').eq(0).val();

    if (newgif.length > 2) {
        gifs.push(newgif);
    }

    populateButtons(gifs, 'gifButton', '#gifButtons');

    return false;
});
