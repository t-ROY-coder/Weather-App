const request = require("postman-request");

const forcast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=82311ca9440e51fadafee6142c30012e&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const currData = body.current;
      callback(undefined, {
        description: currData.weather_descriptions[0],
        temperature: currData.temperature,
        app_temperature: currData.feelslike,
      });
    }
  });
};

module.exports = forcast;
