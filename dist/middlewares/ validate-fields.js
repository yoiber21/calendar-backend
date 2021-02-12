"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var validateFields = function validateFields(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
  var next = arguments.length > 2 ? arguments[2] : undefined;
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  next();
};

var _default = validateFields;
exports["default"] = _default;