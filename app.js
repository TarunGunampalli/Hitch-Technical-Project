// var express = require("express");
// var app = express();
// var port = 3000;

// app.use("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// // app.get("/", (req, res) => {
// //     res.send("Hello World");
// // });

// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/node-demo", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// var nameSchema = new mongoose.Schema({
//     firstName: String,
//     lastNameName: String,
// });

// var User = mongoose.model("User", nameSchema);

// app.post("/addname", (req, res) => {
//     var myData = new User(req.body);
//     myData
//         .save()
//         .then((item) => {
//             res.send("item saved to database");
//         })
//         .catch((err) => {
//             res.status(400).send("unable to save to database");
//         });
// });

// var bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(port, () => {
//     console.log("Server listening on port " + port);
// });

var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/hitch-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
});
var User = mongoose.model("Person", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    // console.log(req.body);
    var myData = new User(req.body);
    console.log(myData);
    myData.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send("Unable to save to database");
            return;
        }

        res.send("Name saved to database");
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
