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
  database: "burgers_db"
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

res.render("login");

});

app.get("/signup", function(req, res){

res.render("setup");

});

app.post("/sets", function(req, res){

   connection.query("SELECT * FROM users;", function(err, data) {

var users = {

  datas: data
}

res.json(users);
})
 });


app.get("/home/:id", function(req, res){

 var userid = JSON.parse(req.params.id);
 var name ="";

 connection.query("SELECT * FROM users where id =?;", [userid], function(err, data) {


name = data[0].username;

});

connection.query("SELECT * FROM burgers;", function(err, data) {
 
 var yes = [];
var not = [];

  var Dev = {

      devy: yes,
      devn: not,
      user: name
    }

for (var i = 0; i < data.length; i++) {
if(JSON.parse(data[i].devoured) === 0) {

not.push(data[i]);
}   else{

yes.push(data[i]);
}
}

console.log(Dev);

	 res.render("index", {Dev});
});

});

app.post("/add", function(req, res){

	connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burgeradd], function(err, data) {

	res.redirect("/home");
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


app.post("/users/", function(req, res){

console.log(req.body);

  connection.query("SELECT * FROM users;", function(err, data) {

    console.log(data);

    var dats = {

      daty: data,
      reqs: req.body
    }

    console.log(dats);
    console.log(dats.daty);
    console.log(dats.reqs);

  res.json(dats);
});

});

app.post("/signs", function(req, res){

console.log(req.body.users);
console.log(req.body.pws);
  connection.query("INSERT INTO users (username, password) VALUES (?, ?);", [req.body.users, req.body.pws], function(err, data) {
  res.end();
});

});

app.listen(PORT, function() {
  console.log("burger app listening on port", PORT);
});