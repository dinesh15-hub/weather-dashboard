let cities = [];

fetch("cities.json")
  .then(res => res.json())
  .then(data => cities = data);

function suggestCities(query) {
  const box = document.getElementById("suggestions");
  box.innerHTML = "";

  if (query.length < 3) {
    box.style.display = "none";
    return;
  }

  const filtered = cities.filter(city =>
    city.toLowerCase().startsWith(query.toLowerCase())
  );

  filtered.forEach(city => {
    const div = document.createElement("div");
    div.textContent = city;
    div.onclick = () => {
      document.getElementById("cityInput").value = city;
      box.innerHTML = "";
      box.style.display = "none";
    };
    box.appendChild(div);
  });

  box.style.display = filtered.length ? "block" : "none";
}

function getWeather(city = null) {
  const input = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");
  const cityName = city || input.value.trim();
  const weatherImage = document.getElementById("weatherImage");

  if (!cityName) {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    weatherResult.classList.remove("hidden");
    return;
  }

  const apiKey = "ce37360e04070f315f38704515b8b494";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
   .then(data => {
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const photoUrl = `https://source.unsplash.com/800x400/?${data.name}`;

  // 👇 This shows the city image
  weatherImage.innerHTML = `<img src="${photoUrl}" alt="${data.name} photo">`;

  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="Weather Icon">
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;

  weatherResult.innerHTML = weatherHTML;
  weatherResult.classList.remove("hidden");
})