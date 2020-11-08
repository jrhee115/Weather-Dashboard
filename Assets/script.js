// console.log("I hit");

$("#search-button").on("click", function(){
    var searchValue = $("#search-value").val();

    $("#search-value").val("");

    searchWeather(searchValue);
})

function searchWeather(searchValue){
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=b15857b75000df26bc3646e1cbb33de4",
        dataType: "json", 
    }).then(function(data){
    console.log(data);
        //create a history link for the search (loop up .push())

        $("#today").empty();

        //creating a card for appending wearther data
        var title = $("<h3>").addClass("card-title").text(data.name);
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed);
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity);
        var temp = $("<p>").addClass("card-text").text("Temp " + data.main.temp);
        var cardBody = $("<div>").addClass("card-body");

        cardBody.append(title, wind,humid, temp);
        card.append(cardBody);
        $("#today").append(card);

    //function to get the forecast(its a different URL)
        //use a forloop to loop over all forcast (by spec)

    
    //function to get UV index (another different URL)

        function uvIndex(uvLat, uvLon){
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=b15857b75000df26bc3646e1cbb33de4&lat="+ uvLat +"&lon=" + uvLon;
            $.ajax({
            url: uvURL,
            method: "GET",
            }).then(function(data){
            console.log(data);


            $(currentUV).html(data.value);
            });
        }


    // var UVlat = data.coord.lat
    // var UVlon = data.coord.lon
    // var queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + UVlat + UVlon + "$appid=b15857b75000df26bc3646e1cbb33de4"

    // $.ajax({
    //     url: queryUV,
    //     method: "GET"
    // }).then(function(data){
    //     console.log(data);

    //     $("#today").empty();

    //     var UVdata = $("<p>").addClass("card-text").text("Uv: " + data.searchValue);

    //     cardBody.append(UVdata);
    //     card.append(cardBody);
    //     $("#today").append(card);
    // })

    //get current search history, if there is any

    //search 
    }
    )}
