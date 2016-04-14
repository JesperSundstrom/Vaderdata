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
                $('<li>', { text: "Vindbyar: " + item.gustSpeed + "m/s" }).appendTo($('#vind'));
                $('<li>', { text: "Luft temperatur: "+ item.airTemp + "° C" }).appendTo($('#temp'));
                $('<li>', { text: "Vatten temperatur: " + item.waterTemp + "° C" }).appendTo($('#temp'));
                $('#batteri ').text("Batteri: " + item.battery + "%")

                $('#updated ').text(item.lastUpdate)
//
                var direction = parseInt(item.windDirection);
                var speed = item.windSpeed;
                var canvas = new createjs.Stage("compass");

                var compass = new createjs.Bitmap("./img/compass.png");
                compass.scaleX = .5;
                compass.scaleY = .5;
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
                needle.rotation =  direction - 179;
                canvas.addChild(needle);

                createjs.Tween.get(needle, { loop: true })
                    .to({ rotation: direction - 181 }, 700, createjs.Ease.getPowInOut(2))
                    .to({ rotation: direction - 179 }, 1000, createjs.Ease.getPowInOut(2));

                var circles = new createjs.Bitmap("./img/Bubbles.png");
                circles.scaleX = .5;
                circles.scaleY = .5;
                canvas.addChild(circles);

                var vaderstracken = ["S", "SV", "V", "NV", "N", "NÖ", "Ö", "SÖ"]; // (i * 45 - 22.5) % 360  ||  ((i + 1) * 45 - 22.5) % 360, 
                var streck = vaderstracken[Math.floor((direction + 22.5) / 45) % 8];

                
                var val = new createjs.Text(streck, "20px 'Lato'", "#000000");
                val.x = 113;
                val.y = 121;
                val.textBaseline = "alphabetic";
                canvas.addChild(val);
                var value = new createjs.Text(direction + '\xB0', "23px 'Lato'", "#000000");
                value.x = 100;
                value.y = 145;
                value.textBaseline = "alphabetic";
                canvas.addChild(value);


                var value = new createjs.Text(speed, "15px 'Lato'", "#000000");
                value.x = 70;
                value.y = 103;
                value.textBaseline = "alphabetic";
                canvas.addChild(value);
                var value = new createjs.Text("m/s", "15px 'Lato'", "#000000");
                value.x = 73;
                value.y = 116;
                value.textBaseline = "alphabetic";
                canvas.addChild(value);

                createjs.Ticker.setFPS(60);
                createjs.Ticker.addEventListener("tick", canvas);



                var canvasTemp = new createjs.Stage("Temp");

                var rect = new createjs.Rectangle(0, 0, 100, 100);
                canvasTemp.addChild(rect);


                createjs.Ticker.setFPS(60);
                createjs.Ticker.addEventListener("tick", canvasTemp);
            })

        },

        error: function (data) {
            $('#status ').text("Datan kunde ej laddas, Försök igen senare eller kontrollera anslutningen")


        }

    });
});

