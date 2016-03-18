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
                        $('<li>', { text:item.windSpeed }).appendTo($('#products'));
						 $('<li>', { text:item.windDirection+"°" }).appendTo($('#products'));
						$('<li>', { text:item.gustSpeed +"m/s" }).appendTo($('#products'));
						 $('<li>', { text:item.airTemp +"° C"}).appendTo($('#products'));
						 $('<li>', { text:item.waterTemp +"° C" }).appendTo($('#products'));
						 $('<li>', { text:item.battery +"°%"}).appendTo($('#products'));
						 $('<li>', { text:item.lastUpdate }).appendTo($('#products'));

                   })
     
     



            },
            
         error: function (data) {
                        $('<li>', { text:" Datan kunde ej laddas, Försök igen senare eller kontrollera anslutningen" }).appendTo($('#products'));
  
            }
                   
    });
});
		
	