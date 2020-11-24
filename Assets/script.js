$(document).ready(function(){


$("#search-button").on("click", function(){
    var searchValue = $("#search-value").val();
//search val var
    $("#search-value").val("");
//pulling search with val
    searchWeather(searchValue);
});

function searchWeather(searchValue){
    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=b15857b75000df26bc3646e1cbb33de4`,
        dataType: "json", 
    }).then(function(data){
        console.log(data);

        //create a history link for the search (loop up .push())

        $("#today").empty();

        //creating a card for appending wearther data
        var title = $("<h3>").addClass("card-title").text(data.name);
        var date = $("<h5>").addClass("card-subtitle mb-2 text-muted").text(moment().format("L"));
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "mph");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temp: " + data.main.temp + "°F");
        var badgeURL = "http://openweathermap.org/img/w/" + data.weather[0].badge + ".png";
        var badge = $("img").attr("src", badgeURL);
        var cardBody = $("<div>").addClass("card-body").attr("id", "searchWeather");

        cardBody.append(title, date, wind, humid, temp);
        card.append(cardBody);
        title.append(badge);
        $("#today").append(card);

        getUV(data.coord.lat, data.coord.lon);
        fiveDay(searchValue);
    });
}
    //function to get UV index (another different URL)
    function getUV(lat, lon) {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b15857b75000df26bc3646e1cbb33de4`,
            dataType: "json"
        }).then(function(data){
            // console.log(data);
            var uv = $("<p>").addClass("card-text").text(`UV Index: `);
            var inDex = $("<span>").text(`${data.value}`);

            if (data.value < 3) {
                inDex.addClass("low");
            }
            else if (data.value <=5) {
                inDex.addClass("medium");
            } 
            else{
                inDex.addClass("high");
            }
            uv.append(inDex);
            $("#searchWeather").append(uv);
        });
    }
})
