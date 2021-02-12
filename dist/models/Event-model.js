"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EventSchema = (0, _mongoose.Schema)({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  // Referencia o relacion
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
EventSchema.method('toJSON', function () {
  var _this$toObject = this.toObject(),
      __v = _this$toObject.__v,
      _id = _this$toObject._id,
      object = _objectWithoutProperties(_this$toObject, ["__v", "_id"]);

  object.id = _id;
  return object;
});

var _default = (0, _mongoose.model)('Event', EventSchema);

exports["default"] = _default;