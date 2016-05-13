var windSpeedGraph = [];
var windDirectionGraph = [];
var latestUpdateGraph = [];

$(document).ready(function () {
    // Send an AJAX request


    $.ajax({
        url: 'http://infomedia.orebro.se/v%C3%A4derdata/api/weather/get?value=20',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            // On success, 'data' contains a list of products.
            $("#products").empty();

            $.each(data, function (key, item) {
                // Add a list item for the product.




                $('#batteri ').text("Batteri: " + item.battery + "%")
                $('#vindbyar ').text("*Med vinbyar upp till " + item.gustSpeed + "m/s")

                $('#updated ').text(item.lastUpdate)
                //
                var direction = parseInt(item.windDirection);
                $(".historyContainer").append('<div><p class="time">nu</p><p>' + item.windSpeed + 'm/s</p><img style="-ms-transform: rotate(' + (direction - 180) + 'deg); -webkit-transform: rotate(' + (direction - 180) + 'deg);transform: rotate(' + (direction - 180) + 'deg);"width="60px" src="img/pil.png" /><p>' + item.windDirection + '°</p></div>');

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
                needle.rotation = direction - 1;

                canvas.addChild(needle);

                createjs.Tween.get(needle, { loop: true })
                    .to({ rotation: direction + 1 }, 700, createjs.Ease.getPowInOut(2))
                    .to({ rotation: direction - 1 }, 1000, createjs.Ease.getPowInOut(2));

                var circles = new createjs.Bitmap("./img/Bubbles.png");
                circles.scaleX = .5;
                circles.scaleY = .5;
                canvas.addChild(circles);

                var vaderstracken = ["N", "NNO", "NO", "ONO", "O", "OSO", "SO", "SSO", "S", "SSV", "SV", "VSV", "V", "VNV", "NV", "NNV"]; // (i * 45 - 22.5) % 360  ||  ((i + 1) * 45 - 22.5) % 360, 
                var streck = vaderstracken[Math.floor((direction + 11.25) / 22.5) % 16];


                var val = new createjs.Text(streck, "20px 'Lato'", "#000000");
                var b = val.getBounds();
                val.x = 127 - b.width / 2;
                val.y = 120;

                val.textBaseline = "alphabetic";
                canvas.addChild(val);
                var value = new createjs.Text(direction + '\xB0', "23px 'Lato'", "#000000");
                var b = value.getBounds();
                value.x = 125 - b.width / 2;
                value.y = 157 - b.height / 2;

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




                //LuftTempratur
                var Luft = parseInt(item.airTemp);
                var tempHeight = Luft + 10;
                var canvasAirTemp = new createjs.Stage("airTemp");

                var rect = new createjs.Shape();
                rect.graphics.beginFill("#c0dcdf").drawRect(32, 169 - ((46 * 3.5) + 1), 34, (46 * 3.5) + 1);
                rect.graphics.beginFill("#7dcbdc").drawRect(32, 169 - ((Math.min(tempHeight, 46) * 3.5) + 1), 34, (Math.min(tempHeight, 46) * 3.5) + 1);
                rect.graphics.beginFill("#7dcbdc").drawCircle(50, 206, 40);
                canvasAirTemp.addChild(rect);

                var circles = new createjs.Bitmap("./img/cloud.png");
                circles.scaleX = .6;
                circles.scaleY = .7;
                circles.x = 20;
                circles.y = 170;
                canvasAirTemp.addChild(circles);

                var value = new createjs.Text(Luft + '\xB0', "23px 'Lato'", "#000000");
                var b = value.getBounds();
                value.x = 50 - b.width / 2;
                value.y = 230 - b.height / 2;
                value.textBaseline = "alphabetic";
                canvasAirTemp.addChild(value);

                var circles = new createjs.Bitmap("./img/Temp.png");
                circles.x = -75;
                circles.scaleX = .5;
                circles.scaleY = .5;
                canvasAirTemp.addChild(circles);

                var circles = new createjs.Bitmap("./img/Temp-Streck.png");
                circles.x = -75;
                circles.scaleX = .5;
                circles.scaleY = .5;
                canvasAirTemp.addChild(circles);

                createjs.Ticker.setFPS(60);
                createjs.Ticker.addEventListener("tick", canvasAirTemp);


                //VattenTemp
                var waterTemp = parseInt(item.waterTemp);
                var tempHeight = waterTemp + 5;
                var canvasWaterTemp = new createjs.Stage("waterTemp");

                var rect = new createjs.Shape();
                rect.graphics.beginFill("#c0dcdf").drawRect(32, 169 - ((46 * 3.5) + 1), 34, (46 * 3.5) + 1);
                rect.graphics.beginFill("#7dcbdc").drawRect(32, 169 - ((Math.min(tempHeight, 35) * 4.5) + 1), 34, (Math.min(tempHeight, 35) * 4.5) + 1);
                rect.graphics.beginFill("#7dcbdc").drawCircle(50, 206, 40);
                canvasWaterTemp.addChild(rect);

                var circles = new createjs.Bitmap("./img/drop.png");
                circles.scaleX = .6;
                circles.scaleY = .6;
                circles.x = 20;
                circles.y = 175;
                canvasWaterTemp.addChild(circles);

                var value = new createjs.Text(waterTemp + '\xB0', "23px 'Lato'", "#000000");
                var b = value.getBounds();
                value.x = 50 - b.width / 2;
                value.y = 230 - b.height / 2;
                value.textBaseline = "alphabetic";
                canvasWaterTemp.addChild(value);

                var circles = new createjs.Bitmap("./img/Temp.png");
                circles.x = -75;
                circles.scaleX = .5;
                circles.scaleY = .5;
                canvasWaterTemp.addChild(circles);

                var circles = new createjs.Bitmap("./img/Temp-Streck.png");
                circles.x = -75;
                circles.scaleX = .5;
                circles.scaleY = .5;
                canvasWaterTemp.addChild(circles);

                createjs.Ticker.setFPS(60);
                createjs.Ticker.addEventListener("tick", canvasWaterTemp);






                var tiden = String(item.lastUpdate).substring(12, 17);

                windSpeedGraph.push(item.windSpeed);
                windDirectionGraph.push(item.windDirection);
                latestUpdateGraph.push(tiden)



            })

            windSpeedGraph.reverse();
            windDirectionGraph.reverse();
            latestUpdateGraph.reverse();

            reporter();
        },

        error: function (data) {
            $('#status ').text("Datan kunde ej laddas, Försök igen senare eller kontrollera anslutningen")


        }

    });
});

function reporter() {
    graph($("#range-1a").val());
}
$("#myRange").on("change", reporter);

function graph(value) {

    var zoom = 20;

    var graph = new createjs.Stage("graph");
    var canvas = document.getElementById("graph");

    var antalLaddade = value * 50;

    var line = new createjs.Shape();
    line.graphics.setStrokeStyle(3).beginStroke("#173A3E");
    line.graphics.moveTo(antalLaddade, 300 - windSpeedGraph[0] * zoom);

    canvas.width = (antalLaddade + 30);

    for (var i = 1; i < antalLaddade; i++) {
        line.graphics.lineTo(antalLaddade - (i * 50), 300 - windSpeedGraph[i] * zoom);
    }

    line.graphics.endStroke();
    graph.addChild(line);
    var pil = new createjs.Bitmap("./img/GrafDot2.png");
    pil.regX = 25;
    pil.regY = 25;
    pil.x = antalLaddade;
    pil.y = 300 - windSpeedGraph[0] * zoom;
    pil.rotation = windDirectionGraph[0] - 225;
    pil.scaleX = .5;
    pil.scaleY = .5;
    graph.addChild(pil);

    var valueText = new createjs.Text(windSpeedGraph[0] + " m/s", "10px 'Lato'", "#000000");
    var b = valueText.getBounds();
    valueText.x = antalLaddade - (0 * 50) - 20;
    valueText.y = 325 - windSpeedGraph[0] * zoom;
    valueText.textBaseline = "alphabetic";
    graph.addChild(valueText);

    var valueText = new createjs.Text(latestUpdateGraph[0], "13px 'Lato'", "#000000");
    var b = valueText.getBounds();
    valueText.x = antalLaddade - (0 * 50) - 10;
    valueText.y = 380;
    valueText.textBaseline = "alphabetic";
    graph.addChild(valueText);

       


    for (var i = 1; i < windSpeedGraph.length; i++) {
        var pil2 = new createjs.Bitmap("./img/GrafDot2.png");
        pil2.regX = 25;
        pil2.regY = 25;
        pil2.scaleX = .5;
        pil2.scaleY = .5;
        pil2.x = antalLaddade - (i * 50);
        pil2.y = 300 - windSpeedGraph[i] * zoom;
        pil2.rotation = windDirectionGraph[i] - 225;
        
        graph.addChild(pil2);

        var valueText = new createjs.Text(windSpeedGraph[i] +" m/s", "10px 'Lato'", "#000000");
        var b = valueText.getBounds();
        valueText.x = antalLaddade - (i * 50) - 10;
        valueText.y = 325 - windSpeedGraph[i] * zoom;
        valueText.textBaseline = "alphabetic";
        graph.addChild(valueText);


        var valueText = new createjs.Text(latestUpdateGraph[i], "13px 'Lato'", "#000000");
        var b = valueText.getBounds();
        valueText.x = antalLaddade - (i * 50) - 10;
        valueText.y = 380;
        valueText.textBaseline = "alphabetic";
        graph.addChild(valueText);

    }



    graph.update();
    var left = $('.x-scroll').width();

    $('.x-scroll, html').scrollLeft(antalLaddade);



}