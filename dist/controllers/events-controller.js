"use strict";

var _express = require("express");

var _EventModel = _interopRequireDefault(require("../models/Event-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getEvents = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req) {
    var res,
        eventos,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _express.response;
            _context.next = 3;
            return _EventModel["default"].find().populate('user', 'name');

          case 3:
            eventos = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              error: false,
              eventos: eventos
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getEvents(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createEvents = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {
    var res,
        evento,
        eventoGuardado,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : _express.response;
            evento = new _EventModel["default"](req.body);
            _context2.prev = 2;
            evento.user = req.uid;
            _context2.next = 6;
            return evento.save();

          case 6:
            eventoGuardado = _context2.sent;
            return _context2.abrupt("return", res.status(201).json({
              error: false,
              evento: eventoGuardado
            }));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              error: true,
              msg: 'Ha ocurrido un error inesperado por favor comuniquese con su administador'
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));

  return function createEvents(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var updateEvents = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req) {
    var res,
        eventoId,
        uid,
        evento,
        newEvent,
        eventUpdated,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : _express.response;
            eventoId = req.params.id;
            uid = req.uid;
            _context3.prev = 3;
            _context3.next = 6;
            return _EventModel["default"].findById(eventoId);

          case 6:
            evento = _context3.sent;

            if (evento) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              error: false,
              msg: 'No existe este envento en la base de datos'
            }));

          case 9:
            if (!(evento.user.toString() !== uid)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              error: false,
              msg: 'No tienes privilegio para editar este evento'
            }));

          case 11:
            newEvent = _objectSpread(_objectSpread({}, req.body), {}, {
              user: uid
            });
            _context3.next = 14;
            return _EventModel["default"].findByIdAndUpdate(eventoId, newEvent, {
              "new": true
            });

          case 14:
            eventUpdated = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              error: false,
              evento: eventUpdated
            }));

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              error: true,
              msg: 'Ha ocurrido un error inesperado por favor comuniquese con su administador'
            }));

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 18]]);
  }));

  return function updateEvents(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteEvents = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req) {
    var res,
        eventoId,
        uid,
        evento,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _express.response;
            eventoId = req.params.id;
            uid = req.uid;
            _context4.prev = 3;
            _context4.next = 6;
            return _EventModel["default"].findById(eventoId);

          case 6:
            evento = _context4.sent;

            if (evento) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              error: false,
              msg: 'No existe este envento en la base de datos'
            }));

          case 9:
            if (!(evento.user.toString() !== uid)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(401).json({
              error: false,
              msg: 'No tienes privilegio para eliminar este evento'
            }));

          case 11:
            _context4.next = 13;
            return _EventModel["default"].findByIdAndDelete(eventoId);

          case 13:
            return _context4.abrupt("return", res.status(200).json({
              error: false,
              evento: 'Eliminado'
            }));

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json({
              error: true,
              msg: 'Ha ocurrido un error inesperado por favor comuniquese con su administador'
            }));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 16]]);
  }));

  return function deleteEvents(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = {
  getEvents: getEvents,
  createEvents: createEvents,
  updateEvents: updateEvents,
  deleteEvents: deleteEvents
};