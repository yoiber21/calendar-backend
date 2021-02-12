"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateJwt = function validateJwt(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
  var next = arguments.length > 2 ? arguments[2] : undefined;
  var token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion'
    });
  }

  try {
    var _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.SECRET_JWT_SEED),
        uid = _jwt$verify.uid,
        name = _jwt$verify.name;

    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'token no valido'
    });
  }

  next();
};

var _default = validateJwt;
exports["default"] = _default;