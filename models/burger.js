var orm = require("../config/orm.js");

var burger = "";

orm.insertOne(burger);

orm.updateOne(burger);

orm.selectAll(burger);

module.exports = burger;
