// set up express
var express = require("express");
var app = express();
var port = 3000;

// uses .env file for google api key
require("dotenv").config();

// set up parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import for requests
const fetch = require("node-fetch");

// set up mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/hitch-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// scheme for places
var placeSchema = new mongoose.Schema({
    address: String,
    state: String,
    zipCode: String, // ? Maybe String
});
var Place = mongoose.model("Place", placeSchema);

// use index.html for frontend
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// called when the submit button is pressed
app.post("/getPlaceInfo", async (req, res) => {
    let originPlaceInfo = await getPlaceInfo(req.body.originPlace_id);
    let destinationPlaceInfo = await getPlaceInfo(req.body.destinationPlace_id);
    saveData(originPlaceInfo) && saveData(destinationPlaceInfo)
        ? res.send("Successfully saved data")
        : res.send("Failed to save data");
});

// make request to google maps api
async function getPlaceInfo(placeId) {
    let url =
        "https://maps.googleapis.com/maps/api/place/details/json?" +
        new URLSearchParams({
            place_id: placeId,
            fields: ["address_components", "formatted_address"],
            key: process.env.API_KEY,
        });
    let response = await fetch(url);
    response = await response.json();
    return response.result;
}

// create database entries and save them
function saveData(placeInfo) {
    if (!placeInfo) {
        res.send("Place details not found");
        return;
    }

    data = { address: placeInfo?.formatted_address };
    placeInfo?.address_components.map((component) => {
        if (component.types.includes("postal_code")) {
            data["zipCode"] = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
            data["state"] = component.long_name;
        }
    });

    let newEntry = new Place(data);
    newEntry.save((err) => {
        if (err) {
            console.log(err);
            return false;
        }
    });
    return true;
}

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
