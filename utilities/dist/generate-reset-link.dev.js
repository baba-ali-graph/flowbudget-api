"use strict";

module.exports = function _callee(db, _ref) {
  var _id, email, resetLink;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _id = _ref._id, email = _ref.email;
          resetLink = generateLink(_id, email);
          _context.next = 4;
          return regeneratorRuntime.awrap(db.updateUser(_id, {
            reset_link: resetLink
          }));

        case 4:
          resetLink = _context.sent;
          return _context.abrupt("return", resetLink);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

function generateLink() {
  // @params arg : the list of arguments to use in generating the link
  // NB: This is actually a dummy function
  var resetLink = "";

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (arg) {
    resetLink += arg;
  });
  return resetLink;
}