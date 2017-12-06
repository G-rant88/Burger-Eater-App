var orm = require("../config/orm.js");

module.exports = burger;

orm.insertOne(burger);

orm.updateOne(burger);

orm.selectAll(burger);

