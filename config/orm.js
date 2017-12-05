var con = require("./connection.js");

var orm = {


selectAll: function (){

 con.query("SELECT * FROM burgers", function(err, result, fields) {
 console.log(result);
  
});

},

insertOne: function(val){


con.query("INSERT INTO burgers (burger_name) VALUES (?)", [val], function(err, result, fields) {
 console.log(val + " was added");
});
},

updateOne: function (dev){

con.query("UPDATE burgers SET devoured = true WHERE burger_name =?", [dev], function(err, result, fields) {
 console.log(dev + " was devoured!");
}); 
}

}

module.exports = orm;

