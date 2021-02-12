"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _authController = _interopRequireDefault(require("../controllers/auth-controller"));

var _validateFields = _interopRequireDefault(require("../middlewares/ validate-fields"));

var _validateJwt = _interopRequireDefault(require("../middlewares/validate-jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*  Ruta
    /api/auth 
*/
var router = (0, _express.Router)();
router.post('/new', [(0, _expressValidator.check)('name', 'El nombre es obligatorio').not().isEmpty(), (0, _expressValidator.check)('email', 'El email es obligatorio').isEmail(), (0, _expressValidator.check)('password', 'La contraseñadebe de ser de 6 caracteres o más').isLength({
  min: 6
}), _validateFields["default"]], _authController["default"].createUser);
router.post('/', [(0, _expressValidator.check)('email', 'El email es obligatorio').isEmail(), (0, _expressValidator.check)('password', 'La contraseñadebe de ser de 6 caracteres o más').isLength({
  min: 6
}), _validateFields["default"]], _authController["default"].loginUser);
router.get('/renew', _validateJwt["default"], _authController["default"].renewToken);
var _default = router;
exports["default"] = _default;