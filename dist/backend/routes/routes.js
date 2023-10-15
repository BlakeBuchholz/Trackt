"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _profile = _interopRequireDefault(require("../../pages/profile"));
var _features = _interopRequireDefault(require("../../pages/features"));
var _pricing = _interopRequireDefault(require("../../pages/pricing"));
var _AppContent = _interopRequireDefault(require("../../pages/AppContent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Routesjs() {
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/_react.default.createElement(_AppContent.default, null)
  }), " ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/features",
    element: /*#__PURE__*/_react.default.createElement(_features.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/pricing",
    element: /*#__PURE__*/_react.default.createElement(_pricing.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/profile",
    element: /*#__PURE__*/_react.default.createElement(_profile.default, null)
  }));
}
var _default = exports.default = Routesjs;