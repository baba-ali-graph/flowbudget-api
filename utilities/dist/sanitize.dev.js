"use strict";

module.exports = function (obj) {
  for (var key in obj) {
    obj[key] = sanitizer(obj[key]);
  }

  return obj;
};

function sanitizer(arg) {
  //WARN: no stripping spaces
  arg = arg.toLowerCase();
  return arg;
}