$(document).ready(function(){


$("#search-button").on("click", function(){
    var searchValue = $("#search-value").val();
//search val var
    $("#search-value").val("");
//pulling search with val
    searchWeather(searchValue);
});

var uvLat ="";
var uvLon ="";

function searchWeather(searchValue){
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=b15857b75000df26bc3646e1cbb33de4",
        dataType: "json", 
    }).then(function(data){
        console.log(data);
        uvLat = data.coord.lat;
        uvLon = data.coord.lon;
        //create a history link for the search (loop up .push())

        $("#today").empty();

        //creating a card for appending wearther data
        var title = $("<h3>").addClass("card-title").text(data.name);
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "mph");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temp " + data.main.temp);
        // var tempF = (temp - 273.15) * 1.8 + 32;
        var cardBody = $("<div>").addClass("card-body");

        cardBody.append(title, wind,humid, temp);
        card.append(cardBody);
        $("#today").append(card);
        getUV();
    
    //function to get UV index (another different URL)
    function getUV() {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=b15857b75000df26bc3646e1cbb33de4&lat="+ uvLat +"&lon=" + uvLon,
            dataType: "json"
        }).then(function(data){
            console.log(data);
        })
    }


    //function to get the forecast(its a different URL)
    //use a forloop to loop over all forcast (by spec)

    //get current search history, if there is any

    //search 
})
}
})
