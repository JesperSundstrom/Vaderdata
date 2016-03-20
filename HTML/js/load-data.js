$(document).ready(function () {
    // Send an AJAX request


    $.ajax({
        url: 'http://localhost:20728/api/weather',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            // On success, 'data' contains a list of products.
            $("#products").empty();

            $.each(data, function (key, item) {
                // Add a list item for the product.
                $('<li>', { text: "Vindhastighet: " + item.windSpeed + "m/s" }).appendTo($('#products'));
                $('<li>', { text: "Vindriktning: " + item.windDirection + "°" }).appendTo($('#products'));
                $('<li>', { text: "Vindpustar: " + item.gustSpeed + "m/s" }).appendTo($('#products'));
                $('<li>', { text: "Luft temperatur: " + item.airTemp + "° C" }).appendTo($('#products'));
                $('<li>', { text: "Vatten temperatur: " + item.waterTemp + "° C" }).appendTo($('#products'));
                $('<li>', { text: "Batteri: " + item.battery + "%" }).appendTo($('#products'));
                $('<li>', { text: "Senast uppdaterad: " + item.lastUpdate }).appendTo($('#products'));

            })





        },

        error: function (data) {
            $('<li>', { text: " Datan kunde ej laddas, Försök igen senare eller kontrollera anslutningen" }).appendTo($('#products'));

        }

    });
});

