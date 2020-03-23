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
var FileUtil_1 = require("./util/FileUtil");
var FileBrowser_1 = __importDefault(require("./components/FileBrowser"));
exports.FileBrowser = FileBrowser_1.default;
var typedef_1 = require("./typedef");
exports.FileView = typedef_1.FileView;
exports.InputEventType = typedef_1.InputEventType;
exports.KbKey = typedef_1.KbKey;
exports.Option = typedef_1.Option;
exports.SortProperty = typedef_1.SortProperty;
exports.SortOrder = typedef_1.SortOrder;
var _a = FileUtil_1.FileUtil.getDemoFs(), demoFileMap = _a.demoFileMap, demoRootFolderId = _a.demoRootFolderId;
exports.demoFileMap = demoFileMap;
exports.demoRootFolderId = demoRootFolderId;
//# sourceMappingURL=index.js.map