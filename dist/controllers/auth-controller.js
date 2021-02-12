"use strict";

var _express = require("express");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _UserModel = _interopRequireDefault(require("../models/User-model"));

var _jwt = _interopRequireDefault(require("../helpers/jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req) {
    var res,
        _req$body,
        email,
        password,
        userExist,
        user,
        salt,
        token,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _express.response;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.prev = 2;
            _context.next = 5;
            return _UserModel["default"].findOne({
              email: email
            });

          case 5:
            userExist = _context.sent;

            if (!userExist) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              msg: 'Este email ya esta registrado'
            }));

          case 8:
            user = new _UserModel["default"](req.body); //Encriptar contraseña 

            salt = _bcrypt["default"].genSaltSync();
            user.password = _bcrypt["default"].hashSync(password, salt);
            _context.next = 13;
            return user.save();

          case 13:
            _context.next = 15;
            return (0, _jwt["default"])(user.id, user.name);

          case 15:
            token = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              ok: true,
              uid: user.id,
              name: user.name,
              token: token
            }));

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            res.status(500).json({
              ok: false,
              msg: 'Por favor hable con el administrador'
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 19]]);
  }));

  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var loginUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {
    var res,
        _req$body2,
        email,
        password,
        userExist,
        validPassword,
        token,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : _express.response;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.prev = 2;
            _context2.next = 5;
            return _UserModel["default"].findOne({
              email: email
            });

          case 5:
            userExist = _context2.sent;

            if (userExist) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              ok: false,
              msg: 'El usuario no existe con este email'
            }));

          case 8:
            // Confirmar los password
            validPassword = _bcrypt["default"].compareSync(password, userExist.password);

            if (validPassword) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              ok: false,
              msg: 'Contraseña incorrecta'
            }));

          case 11:
            _context2.next = 13;
            return (0, _jwt["default"])(userExist.id, userExist.name);

          case 13:
            token = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              uid: userExist.id,
              name: userExist.name,
              token: token
            }));

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(500).json({
              ok: false,
              msg: 'Por favor hable con el administrador'
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 17]]);
  }));

  return function loginUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var renewToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req) {
    var res,
        uid,
        name,
        token,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : _express.response;
            uid = req.uid, name = req.name; // Generar un  nuevo jwt y retornarlo en esta peticion

            _context3.next = 4;
            return (0, _jwt["default"])(uid, name);

          case 4:
            token = _context3.sent;
            res.json({
              ok: true,
              token: token
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function renewToken(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  renewToken: renewToken
};