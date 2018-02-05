"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");

let app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.use(logger("dev"));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

//Port Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});