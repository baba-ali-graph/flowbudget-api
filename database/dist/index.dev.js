"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logger = require('../logger/index');

var userDB = require('./3rdParty/users.js');

var budgetDB = require('./3rdParty/budgets.js');

var DatabaseModel =
/*#__PURE__*/
function () {
  function DatabaseModel() {
    _classCallCheck(this, DatabaseModel);

    logger.log(" A new db instance has been initiated");
  }

  _createClass(DatabaseModel, [{
    key: "registerUser",
    value: function registerUser(payload) {
      return new Promise(function (resolve, reject) {
        return userDB.insert(_objectSpread({}, payload), function (err, newUser) {
          if (err) return reject(err);
          return resolve(newUser);
        });
      });
    }
  }, {
    key: "updateUser",
    value: function updateUser(ID, payload) {
      return new Promise(function (resolve, reject) {
        return userDB.find({
          _id: ID
        }, function (err, existingUser) {
          if (err) return reject(err);

          var user = _objectSpread({}, existingUser, {}, payload);

          return userDB.update({
            _id: ID
          }, _objectSpread({}, user), function (err, updatedUser) {
            if (err) return reject(err);
            return resolve(updatedUser);
          });
        });
      });
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(ID) {
      return new Promise(function (resolve, reject) {
        return userDB.remove({
          _id: ID
        }, {}, function (err, deletedUser) {
          if (err) return reject(err);
          return resolve(deletedUser);
        });
      });
    }
  }, {
    key: "fetchUser",
    value: function fetchUser(ID) {
      return new Promise(function (resolve, reject) {
        return userDB.find({
          _id: ID
        }, function (err, existingUser) {
          if (err) return reject(err);
          return resolve(existingUser);
        });
      });
    }
  }, {
    key: "fetchUserWithKey",
    value: function fetchUserWithKey(key, email) {
      return new Promise(function (resolve, reject) {
        return userDB.find(_defineProperty({}, key, email), function (err, existingUser) {
          if (err) return reject(err);
          return resolve(existingUser);
        });
      });
    }
  }, {
    key: "createBudget",
    value: function createBudget(payload) {
      return new Promise(function (resolve, reject) {
        return budgetDB.insert(_objectSpread({}, payload), function (err, newBudget) {
          if (err) return reject(err);
          return resolve(newBudject);
        });
      });
    }
  }, {
    key: "updateBudget",
    value: function updateBudget(ID, payload) {
      return new Promise(function (resolve, reject) {
        return budgetDB.find({
          _id: ID
        }, function (err, existingBudget) {
          var budget = _objectSpread({}, existingBudget, {}, payload);

          return budgetDB.update({
            _id: ID
          }, _objectSpread({}, budget), function (err, updatedBudget) {
            if (err) return reject(err);
            return resolve(updatedBudget);
          });
        });
      });
    }
  }, {
    key: "deleteBudget",
    value: function deleteBudget(ID) {
      return new Promise(function (resolve, reject) {
        return budgetDB.remove({
          _id: ID
        }, {}, function (err, deletedBudget) {
          if (err) return reject(err);
          return resolve(deletedBudget);
        });
      });
    }
  }, {
    key: "fetchBudget",
    value: function fetchBudget(ID) {
      return new Promise(function (resolve, reject) {
        return budgetDB.find(ID, function (err, existingBudget) {
          if (err) return reject(err);
          return resolve(existingBudget);
        });
      });
    }
  }]);

  return DatabaseModel;
}();

var db = new DatabaseModel();
module.exports = db;