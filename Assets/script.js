//variables
var city = "";
var searchCity= $("#search-form")

//setting up the API key
var APIKey = "b15857b75000df26bc3646e1cbb33de4";

function weatherDisplay(event){
    event.preventDefault();
    if(searchCity.wal().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}
function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(reponse){
        
    })
}
