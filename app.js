const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
	const query = req.body.cityName;
	const apiKey = "f0b95e2569d8bb655a92242ba4217e10";
	const units = "metric";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
	https.get(url, (response) => {
		console.log(response.statusCode);

		response.on("data", (data) => {
			const WeatherData = JSON.parse(data);
			const temp = WeatherData.main.temp;
			const description = WeatherData.weather[0].description;
			const icon = WeatherData.weather[0].icon;
			const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

			res.write(`<h1>The tempreture in ${query} is ${temp} degrees Celcius</h1>`);
			res.write(`<h1>The Weather is currently ${description} </h1>`);
			res.write(`<img src="${iconUrl}" alt="weather-icon">`);
			res.send();
		});
	});
});

app.listen(port, () => {
	console.log(`listening at port ${port}`);
});
