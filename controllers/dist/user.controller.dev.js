"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var phash = require('password-hash');

var dbInstance = require('../database/index');

var validation = require('../utilities/validation/index');

var generateToken = require('../utilities/generate-token');

var sanitize = require('../utilities/sanitize');

var generateResetLink = require('../utilities/generate-reset-link');

var emailer = require('../emailer/index');

var ERRORS = require('../errors/index');

var _require = require('../utilities/statuses'),
    AUTH_STATUS_FAIL = _require.AUTH_STATUS_FAIL,
    MAIL_STATUS_FAIL = _require.MAIL_STATUS_FAIL,
    SUCCESS = _require.SUCCESS;

exports.registerUser = function _callee(req, res) {
  var user, validated, sanitizedUser, savedUser, token, budgets;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.body;
          validated = validation.user(user);

          if (!validated) {
            _context.next = 19;
            break;
          }

          sanitizedUser = sanitize(user);
          sanitizedUser = _objectSpread({}, sanitizedUser, {
            password: phash.generate(sanitizedUser.password, {
              saltLength: 10
            })
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(dbInstance.registerUser(sanitizedUser));

        case 7:
          savedUser = _context.sent;

          if (!savedUser) {
            _context.next = 16;
            break;
          }

          token = generateToken(savedUser);
          _context.next = 12;
          return regeneratorRuntime.awrap(dbInstance.fetchBudget(savedUser._id));

        case 12:
          budgets = _context.sent;
          if (budgets) res.status(SUCCESS).json({
            token: token,
            budgets: budgets
          });else res.status(AUTH_STATUS_FAIL).json(ERRORS.database_err);
          _context.next = 17;
          break;

        case 16:
          res.status(AUTH_STATUS_FAIL).json(ERRORS.database_err);

        case 17:
          _context.next = 20;
          break;

        case 19:
          res.status(AUTH_STATUS_FAIL).json(ERRORS.validation_err);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.loginUser = function _callee2(req, res) {
  var validatedUser, sanitizedUser, retrieved, hashPassword, token, budget;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          validatedUser = validation.user(req.body);

          if (!validatedUser) {
            _context2.next = 22;
            break;
          }

          sanitizedUser = sanitized(validatedUser);
          _context2.next = 5;
          return regeneratorRuntime.awrap(dbInstance.fetchUser(sanitizedUser));

        case 5:
          retrieved = _context2.sent;

          if (!retrieved) {
            _context2.next = 19;
            break;
          }

          hashPassword = phash.verify(retrieved.password, sanitizedUser.password);

          if (!hashPassword) {
            _context2.next = 16;
            break;
          }

          token = generateToken(retrieved);
          _context2.next = 12;
          return regeneratorRuntime.awrap(dbInstance.fetchBudget(retrieved._id));

        case 12:
          budget = _context2.sent;
          res.status(SUCCESS).json({
            token: token,
            budget: budget
          });
          _context2.next = 17;
          break;

        case 16:
          res.status(AUTH_STATUS_FAIL).json(ERROR.password_err);

        case 17:
          _context2.next = 20;
          break;

        case 19:
          res.status(AUTH_STATUS_FAIL).json(ERROR.database_err);

        case 20:
          _context2.next = 23;
          break;

        case 22:
          res.status(AUTH_STATUS_FAIL).json(ERROR.validation_err);

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.forgetPassword = function _callee3(req, res) {
  var email, existingEmail, resetLink, emailSent, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = sanitize({
            email: req.params.email
          });
          _context3.next = 3;
          return regeneratorRuntime.awrap(dbInstance.fetchUserWithKey(email));

        case 3:
          existingEmail = _context3.sent;

          if (!existingUser) {
            _context3.next = 14;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(generateResetLink(dbInstance, existingUser));

        case 7:
          resetLink = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(emailer.mail(resetLink));

        case 10:
          emailSent = _context3.sent;

          if (emailSent) {
            response = {
              done: true
            };
            res.status(SUCCESS).json(response);
          } else {
            res.status(MAIL_STATUS_FAIL).json(ERROR.email_err);
          }

          _context3.next = 15;
          break;

        case 14:
          res.status(AUTH_STATUS_FAIL).json(ERROR.database_err);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.resetPassword = function _callee4(req, res) {
  var _req$body, resetLink, password;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, resetLink = _req$body.resetLink, password = _req$body.password;
          password = phash.generate(password, {
            saltLength: 10
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};