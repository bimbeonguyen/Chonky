"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Prefix = "[Chonky]";
var ConsoleUtil = /** @class */ (function () {
    function ConsoleUtil() {
    }
    ConsoleUtil.log = function () {
        var inputArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputArgs[_i] = arguments[_i];
        }
        var args = [].slice.call(inputArgs);
        // eslint-disable-next-line no-console
        console.log.apply(null, [Prefix].concat(args));
    };
    ConsoleUtil.warn = function () {
        var inputArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputArgs[_i] = arguments[_i];
        }
        var args = [].slice.call(inputArgs);
        // eslint-disable-next-line no-console
        console.warn.apply(null, [Prefix].concat(args));
    };
    ConsoleUtil.error = function () {
        var inputArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputArgs[_i] = arguments[_i];
        }
        var args = [].slice.call(inputArgs);
        // eslint-disable-next-line no-console
        console.error.apply(null, [Prefix].concat(args));
    };
    ConsoleUtil.logInternalException = function (error, action) {
        ConsoleUtil.error("An exception was thrown while " + action + ". This appears to be an internal Chonky issue." +
            " If this issue persists, please report it on the https://github.com/TimboKZ/Chonky/issues page." +
            " The actual error was:" +
            ("\n    " + error));
    };
    ConsoleUtil.logUnhandledUserException = function (error, action) {
        ConsoleUtil.error("Chonky caught an unhandled exception while " + action + ". This exception originated in user" +
            "code. Ideally, you should catch exceptions in your code yourself. The actual error was:" +
            ("\n    " + error));
    };
    return ConsoleUtil;
}());
exports.default = ConsoleUtil;
//# sourceMappingURL=ConsoleUtil.js.map