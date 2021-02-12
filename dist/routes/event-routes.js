"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _eventsController = _interopRequireDefault(require("../controllers/events-controller"));

var _isDate = _interopRequireDefault(require("../helpers/isDate"));

var _validateFields = _interopRequireDefault(require("../middlewares/ validate-fields"));

var _validateJwt = _interopRequireDefault(require("../middlewares/validate-jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*  Ruta
    /api/events 
*/
var router = (0, _express.Router)();
router.use(_validateJwt["default"]); // Obtener eventos

router.get('/', _eventsController["default"].getEvents); // Crear eventos

router.post('/', [(0, _expressValidator.check)('title', 'El titulo es obligatorio').not().isEmpty(), (0, _expressValidator.check)('start', 'Fecha de inicio es obligatoria').custom(_isDate["default"]), (0, _expressValidator.check)('end', 'Fecha de finalizacion es obligatoria').custom(_isDate["default"]), _validateFields["default"]], _eventsController["default"].createEvents); // Actualizar eventos

router.put('/:id', [(0, _expressValidator.check)('title', 'El titulo es obligatorio').not().isEmpty(), (0, _expressValidator.check)('start', 'Fecha de inicio es obligatoria').custom(_isDate["default"]), (0, _expressValidator.check)('end', 'Fecha de finalizacion es obligatoria').custom(_isDate["default"]), _validateFields["default"]], _eventsController["default"].updateEvents); // Eliminar eventos

router["delete"]('/:id', _eventsController["default"].deleteEvents);
var _default = router;
exports["default"] = _default;