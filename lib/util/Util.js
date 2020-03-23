"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleUtil_1 = __importDefault(require("./ConsoleUtil"));
var typedef_1 = require("../typedef");
// Detect mobile device
exports.isMobileDevice = function () {
    return (typeof window.orientation !== 'undefined' ||
        navigator.userAgent.indexOf('IEMobile') !== -1);
};
// Assertions
exports.isNil = function (value) {
    return value === undefined || value === null;
};
exports.isNumber = function (value) {
    return typeof value == 'number';
};
exports.isBoolean = function (value) {
    return typeof value == 'boolean';
};
exports.isString = function (value) {
    return typeof value == 'string';
};
exports.isArray = function (value) { return Array.isArray(value); };
exports.isObject = function (value) {
    return typeof value === 'object' && value !== null;
};
exports.isFunction = function (value) {
    return typeof value === 'function';
};
exports.getNonNil = function (array, index) {
    if (!exports.isArray(array))
        return null;
    var length = array.length;
    if (index < 0)
        index = length + index;
    if (index < 0 || index >= length)
        return null;
    var elem = array[index];
    if (exports.isNil(elem))
        return null;
    return elem;
};
// Math operations
exports.clamp = function (value, min, max) {
    var _a;
    if (min > max)
        _a = [max, min], min = _a[0], max = _a[1];
    return Math.min(max, Math.max(min, value));
};
exports.clampIndex = function (value, array) {
    return exports.clamp(value, 0, array.length - 1);
};
// Keyboard-related util
exports.detectKey = function (event) {
    var result = typedef_1.kbKeyMap[event.key];
    if (!exports.isNil(result))
        return result;
    result = typedef_1.kbCodeMap[event.code];
    if (!exports.isNil(result))
        return result;
    result = typedef_1.kbKeyCodeMap[event.keyCode];
    return exports.isNil(result) ? result : null;
};
exports.handleKeyPress = function (event) {
    if (!exports.isNil(event.target) && event.target instanceof Element) {
        var tagName = event.target.tagName.toUpperCase();
        var isInInput = tagName === 'INPUT' || tagName === 'TEXTAREA';
        if (isInInput)
            return;
    }
    var key = exports.detectKey(event);
    if (exports.isNil(key))
        return;
    var inputEvent = {
        type: typedef_1.InputEventType.Keyboard,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        key: key,
    };
    var listenerSet = window._chonkyData.kbListenerSet;
    var handled = false;
    listenerSet.forEach(function (listener) {
        if (listener(inputEvent))
            handled = true;
    });
    if (handled)
        event.preventDefault();
};
exports.setupListeners = function () {
    if (exports.isNil(window)) {
        throw new Error('[Chonky] `window` object was not found - Chonky might not work correctly. Are we running in' +
            ' the browser?');
    }
    if (!exports.isNil(window._chonkyData))
        return;
    window._chonkyData = {
        kbListenerSet: new Set(),
    };
    document.addEventListener('keydown', exports.handleKeyPress);
};
// FileBrowser instance/ClickableWrapper related util
exports.registerKbListener = function (kbListener) {
    exports.setupListeners();
    var set = window._chonkyData.kbListenerSet;
    if (set.has(kbListener)) {
        ConsoleUtil_1.default.warn('Tried to register the same keyboard listener twice!');
        return;
    }
    set.add(kbListener);
};
exports.deregisterKbListener = function (kbListener) {
    var set = window._chonkyData.kbListenerSet;
    set.delete(kbListener);
};
//# sourceMappingURL=Util.js.map