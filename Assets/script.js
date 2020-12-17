$(document).ready(function () {


    $("#search-button").on("click", function () {
        var searchValue = $("#search-value").val();
        //search val var
        $("#search-value").val("");
        //pulling search with val
        searchWeather(searchValue);
    });

    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=b15857b75000df26bc3646e1cbb33de4`,
            dataType: "json",
        }).then(function (data) {
            console.log(data);

            saveHistory(searchValue);

            $("#today").empty();

            //creating a card for appending wearther data
            var title = $("<h3>").addClass("card-title").text(data.name);
            var date = $("<h5>").addClass("card-subtitle mb-2 text-muted").text(moment().format("L"));
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "mph");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temp: " + Math.round(data.main.temp) + " °F");
            var badge = (`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`)
            var cardBody = $("<div>").addClass("card-body");

            cardBody.append(title, date, wind, humid, temp);
            card.append(cardBody);
            title.append(badge);
            $("#today").append(card);

            getUV(data.coord.lat, data.coord.lon);
            forecast(searchValue);
        });
    }
    //function to get UV index (another different URL)
    function getUV(lat, lon) {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b15857b75000df26bc3646e1cbb33de4`,
            dataType: "json",
        }).then(function (data) {
            console.log(data);
            var inDex = $("<p>").addClass("card-text").text(`UV Index: `);
            var uvIndex = $("<span>").text(`${data.value}`);

            if (data.value < 3) {
                inDex.addClass("low");
            }
            else if (data.value <= 5) {
                inDex.addClass("medium");
            }
            else {
                inDex.addClass("high");
            }
            inDex.append(uvIndex);
            $("#searchWeather").append(inDex);
        });
    };
    // 5 day forceast
    function forecast(searchValue) {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=b15857b75000df26bc3646e1cbb33de4`,
            dataType: "json",
        }).then(function (data) {
            console.log(data)
            $("#forecastdays").empty();

            for (var i = 7; i < data.list.length; i += 8) {
                var col = $("<div>").addClass("col");
                var card = $("<div>").addClass("card");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                var temp = $("<p>").addClass("card-text").text("Temp: " + Math.round(data.list[i].main.temp) + " °F");
                var badge = (`<img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">`)
                var cardBody = $("<div>").addClass("card-body");

                if (i === 7){
                    var title = $("<h7>").addClass("card-title").text(moment().add(1, "days").format("L"));
                }
                else if(i === 15){
                    var title = $("<h7>").addClass("card-title").text(moment().add(2, "days").format("L"));
                }
                else if(i === 23){
                    var title = $("<h7>").addClass("card-title").text(moment().add(3, "days").format("L"));
                }
                else if(i === 31){
                    var title = $("<h7>").addClass("card-title").text(moment().add(4, "days").format("L"));
                }
                else if(i === 39){
                    var title = $("<h7>").addClass("card-title").text(moment().add(5, "days").format("L"));
                }

                title.append(badge);
                cardBody.append(title, temp, humid);
                card.append(cardBody);
                col.append(card);
                $("#forecastdays").append(col);
            }
        });
    }

    var history= [];

    function saveHistory(searchedCity){
        localStorage.setItem("savedSearch", searchedCity);

        if(!history.includes(searchedCity)){
            history.push(searchedCity);
            var cityName = $("<h6>").addClass("card-body").text(searchedCity);
            var card = $("<div>").addClass("card");
            card.append(cityName);

            $("#searchHistory").append(card)

            cityName.on("click", function(){
                searchWeather(this.innerHTML);
            })
        }
    }
    function showHistory() {
        var searched = localStorage.getItem("saveHistory");
        searchWeather(searched)
    }
    showHistory();
})
