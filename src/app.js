const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(path.join(publicDir)));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "T. Roy",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Weather",
        name: "T. Roy",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Weather",
        msg: "This is the help page",
        name: "T. Roy",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address",
        });
    }

    geocode(
        req.query.address,
        (error, { lattitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }
            forecast(lattitude, longitude, (error, data) => {
                if (error) {
                    return res.send({
                        error: error,
                    });
                }
                res.send({
                    location: location,
                    forecast: data,
                });
            });
        }
    );
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        msg: "Help article NOT found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        msg: "404: Page NOT found",
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});