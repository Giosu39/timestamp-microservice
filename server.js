// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", function (req, res) {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

app.get("/api/:date_string", function (req, res) {
  var date_string = req.params.date_string;

  var unixRegex = /^\d+$/;
  if (unixRegex.test(date_string)) {
    var unixTimestamp = parseInt(date_string);
    var milliseconds = unixTimestamp * 1000;
    var datum = new Date(unixTimestamp);
    res.json({ unix: unixTimestamp, utc: datum.toUTCString() });
  }

  var dateRegex = /^\d\d\d\d\-\d\d\-\d\d$/;
  if (dateRegex.test(date_string)) {
    var year = date_string.slice(0, 4);
    var month = date_string.slice(5, 7);
    var day = date_string.slice(8);
    var datum = new Date(year, month - 1, day);
    res.json({ unix: datum.getTime(), utc: datum.toUTCString() });
  }
  
  res.json({ error: "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
