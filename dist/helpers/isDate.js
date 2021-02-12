"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isDate = function isDate(value) {
  if (!value) return false;
  var fecha = (0, _moment["default"])(value);
  return fecha.isValid() ? true : false; // if ( fecha.isValid() ) return true;
  // else return false;
};

var _default = isDate;
exports["default"] = _default;