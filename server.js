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

var connection;

if(process.env.JAWSDB_URL){

	connection = mysql.createConnection(process.env.JAWSDB_URL);
} 

else{
connection = mysql.createConnection({
  host: "localhost",
  user: "Ben",
  password: "bgrant88",
  database: "burgersdb2"
});

}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

app.use(express.static('public'))

app.get("/",function(req, res){
	connection.query("SELECT * FROM burgers;", function(err, data) {
 
 var yes = [];
var not = [];

  var Dev = {

      devy: yes,
      devn: not
    }

for (var i = 0; i < data.length; i++) {
if(JSON.parse(data[i].devoured) === 0) {

not.push(data[i]);
}   else{

yes.push(data[i]);
}
}

	 res.render("index", {Dev});
});

});

app.post("/add", function(req, res){

	connection.query("INSERT INTO burgers (burger_name, ingredients) VALUES (?, ?)", [req.body.burgeradd, req.body.burgering], function(err, data) {

	res.redirect("/");
});

});

app.get("/:id",function(req, res){
  connection.query("SELECT * FROM burgers where id =?;", [req.params.id], function(err, data) {
console.log(data[0]);

res.render("update-page", data[0]);

})

});

 app.put("/ups",function(req, res){

console.log(req.body);

connection.query("UPDATE burgers SET burger_name = ?, ingredients = ? WHERE id =?", [req.body.burgs, req.body.ings, req.body.ids], function(err, data) {

console.log(err);
 res.end();

});
});


app.put("/devs/:id", function(req, res){

	connection.query("UPDATE burgers SET devoured = ? WHERE id = ?", [true, req.body.ids], function(err, data) {
res.end();
});
});


app.put("/reg/:id", function(req, res){

  connection.query("UPDATE burgers SET devoured = ? WHERE id = ?", [false, req.body.ids], function(err, data) {
res.end();
});
});

app.delete("/del/", function(req, res){

  connection.query("DELETE FROM burgers where devoured =? ", [true], function(err, data) {
console.log("emptied");
res.end();
});
});

app.listen(PORT, function() {
  console.log("burger app listening on port", PORT);
});