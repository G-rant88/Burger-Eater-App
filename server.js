var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');
var app = express();
var PORT = process.env.PORT || 3000;;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "Ben",
  password: "bgrant88",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

app.use(express.static('public'))

app.get("/",function(req, res){
	connection.query("SELECT * FROM burgers;", function(err, data) {

	 res.render("index", {burgers:data});
});

});

app.post("/add", function(req, res){

	connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burgeradd], function(err, data) {

	res.redirect("/");
});

});

app.post("/dev", function(req, res){
	console.log(req.body);
	// console.log(req.body.burger_name);

	connection.query("UPDATE burgers SET devoured =? WHERE burger_name =?", [true, req.body.burger_name], function(err, data) {

	res.redirect("/");
});

});



app.listen(PORT, function() {
  console.log("burger app listening on port", PORT);
});
