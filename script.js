var city = document.querySelector("#city-input");
var search = document.querySelector("#search-btn");
function updateWeatherimage(weatherCondition){
    const weatherimg = document.getElementById("weather-img")
    weatherimg.src = weatherImages[weatherCondition || "images/default.png"] 
}

const weatherImages = {
    Clear: "images/clear.png",
    Clouds: "images/clouds.png",
    Rain: "images/Rain.png",
    Thunderstorm: "images/thunderstorm.png",
    Snow: "images/snow.png.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Haze: "images/haze.png",
    Fog: "images/fog.png",
    Smoke: "images/smoke.png",
    Dust: "images/dust.png"
};


const apikey = "6369fb146bbdf7ffe71df142fa0295e7";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data
async function fetchWeatherData(cityName) {
    // Construct the API URL with the city name and API key
    const apiUrl = `${baseUrl}?q=${cityName}&appid=${apikey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data); // Display the weather data in the console
        let  weatherCondition = data.weather[0].main; 
        let temp = Math.round(data.main.temp);
        let pressure = (data.main)/1000;
        let visibility = (data.visibility)/100;

        document.getElementById("wind-speed").innerText = data.wind.speed
         document.getElementById("weatherTemp").innerText = temp;
        document.getElementById("dayType").innerText = data.weather[0].main;
        document.getElementById("HUM").innerText = data.main.humidity + "%"
        document.getElementById("visible").innerText = visibility+ " km"
        updateWeatherimage(weatherCondition)
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
    }
}

// Add event listener for the search button
search.addEventListener("click", () => {
    const cityName = city.value.trim(); // Get the city name from input
    if (cityName) {
        fetchWeatherData(cityName); // Fetch weather data for the city
    } else {
        console.error("Please enter a city name.");
    }
});