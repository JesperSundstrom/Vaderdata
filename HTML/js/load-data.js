$(document).ready(function () {
    // Send an AJAX request


    $.ajax({
        url: 'http://83.255.196.114:25565/api/weather',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            // On success, 'data' contains a list of products.
            $("#products").empty();

            $.each(data, function (key, item) {
                // Add a list item for the product.
                $('<li>', { text: "Vindhastighet: " + item.windSpeed + "m/s" }).appendTo($('#vind'));
                $('<li>', { text: "Vindriktning: " + item.windDirection + "°" }).appendTo($('#vind'));
                $('<li>', { text: "Vindpustar: " + item.gustSpeed + "m/s" }).appendTo($('#vind'));
                $('<li>', { text: "Luft temperatur: "+ item.airTemp + "° C" }).appendTo($('#temp'));
                $('<li>', { text: "Vatten temperatur: " + item.waterTemp + "° C" }).appendTo($('#temp'));
                $('#batteri ').text("Batteri: " + item.battery + "%")

                $('#updated ').text(item.lastUpdate)
            })





        },

        error: function (data) {
            $('#status ').text("Datan kunde ej laddas, Försök igen senare eller kontrollera anslutningen")


        }

    });
});

