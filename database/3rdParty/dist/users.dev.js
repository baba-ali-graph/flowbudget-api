"use strict";

var path = require('path');

var DataStore = require('nedb');

var filename = path.resolve(process.cwd(), './database/3rdParty/users.db');
var Users = new DataStore({
  filename: filename,
  autoload: true
});
module.exports = Users;