console.log("Client side js file called");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
const msg3 = document.querySelector("#msg3");
const msg4 = document.querySelector("#msg4");
const msg5 = document.querySelector("#msg5");

weatherForm.addEventListener("submit", (e) => {
   e.preventDefault();
   msg1.textContent = "Loading...";
   msg2.textContent = "";
   fetch("/weather?address=" + encodeURIComponent(search.value)).then(
      (response) => {
         response.json().then((data) => {
            if (data.error) {
               msg1.textContent = "ERROR!";
               msg2.textContent = data.error;
            } else {
               msg1.textContent = "Location: " + data.location;
               msg2.textContent = "Forecast: " + data.forecast.description;
               msg3.textContent =
                  "Temperature: " +
                  data.forecast.temperature +
                  " degree Celsius";
               msg4.textContent =
                  "Apparent Temperature: " +
                  data.forecast.app_temperature +
                  " degree Celsius";
               msg5.textContent = "Humidity: " + data.forecast.humidity + "%";
            }
         });
      }
   );
});
