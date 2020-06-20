"use strict";

var jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = function (_ref) {
  var _id = _ref._id,
      username = _ref.username,
      email = _ref.email;
  var secret = process.env.SECRET;
  var token = jwt.sign({
    _id: _id,
    username: username,
    email: email
  }, secret, {
    expiresIn: '2h'
  });
  return token;
};