$(document).ready(function () {
    // Send an AJAX request


    $.ajax({
        url: 'http://vaderapi.lynxwebbyra.se/api/values',
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

                var direction = parseInt(item.windDirection);
                var canvas = new createjs.Stage("compass");

                var compass = new createjs.Bitmap("./img/compass2.png");
                //compass.y = 125;
                //compass.x = 125;
                //compass.regX = 125;
                //compass.regY = 125;
                //compass.rotation = - direction + 1;
                canvas.addChild(compass);

                //createjs.Tween.get(compass, { loop: true })
                //    .to({ rotation: - direction - 1 }, 2500, createjs.Ease.getPowInOut(2))
                //    .to({ rotation: - direction + 1 }, 2500, createjs.Ease.getPowInOut(2));

                var needle = new createjs.Bitmap("./img/needle.png");
                needle.y = 125;
                needle.x = 125;
                needle.regX = 125;
                needle.regY = 125;
                needle.rotation = direction + 1;
                canvas.addChild(needle);

                createjs.Tween.get(needle, { loop: true })
                    .to({ rotation: direction - 1 }, 2000, createjs.Ease.getPowInOut(2))
                    .to({ rotation: direction + 1 }, 2000, createjs.Ease.getPowInOut(2));



                var vaderstracken = ["N", "NÖ", "Ö", "SÖ", "S", "SV", "V", "NV"]; // (i * 45 - 22.5) % 360  ||  ((i + 1) * 45 - 22.5) % 360, 
                var streck = vaderstracken[Math.floor((direction + 22.5) / 45) % 8];

                
                var val = new createjs.Text(streck, "20px 'Lato'", "#000000");
                val.x = 116;
                val.y = 125;
                val.textBaseline = "alphabetic";
                canvas.addChild(val);


                var value = new createjs.Text(direction + '\xB0', "20px 'Lato'", "#000000");
                value.x = 108;
                value.y = 145;
                value.textBaseline = "alphabetic";
                canvas.addChild(value);

                createjs.Ticker.setFPS(60);
                createjs.Ticker.addEventListener("tick", canvas);

            })

        },

        error: function (data) {
            $('#status ').text("Datan kunde ej laddas, Försök igen senare eller kontrollera anslutningen")


        }

    });
});

