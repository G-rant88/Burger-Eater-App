var mysql = require("mysql");
var con = mysql.createConnection({
	host: "localhost",
	user: "Ben",
	password: "bgrant88",
	database: "burgers_db"
});

module.exports = con;