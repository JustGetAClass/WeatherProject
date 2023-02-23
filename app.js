const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=f0b95e2569d8bb655a92242ba4217e10&units=metric";
	https.get(url, (response) => {
		console.log(response.statusCode);

		response.on("data", (data) => {
			const WeatherData = JSON.parse(data);
			const temp = WeatherData.main.temp;
			const description = WeatherData.weather[0].description;
			const icon = WeatherData.weather[0].icon;
			const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

			res.write(`<h1>The tempreture in London is ${temp}</h1>`);
			res.write(`<h1>The Weather is currently ${description} </h1>`);
			res.write(`<img src="${iconUrl}" alt="weather-icon">`)
			res.send()
		});
	});

	// res.send("Yo wassup");
});

app.listen(port, () => {
	console.log(`listening at port ${port}`);
});
