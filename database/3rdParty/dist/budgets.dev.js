"use strict";

var path = require('path');

var DataStore = require('nedb');

var filename = path.resolve(process.cwd(), '/database/3rdParty/budgets.db');
var Budgets = new DataStore({
  filename: filename,
  autoload: true
});
module.exports = Budgets;