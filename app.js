var express = require("express");
var app = express();
var port = 3000;

app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastNameName: String,
});

var User = mongoose.model("User", nameSchema);

app.post("/addname", (req, res) => {});

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
