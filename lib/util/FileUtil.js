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
var filesize_1 = __importDefault(require("filesize"));
var dateformat_1 = __importDefault(require("dateformat"));
var javascript_time_ago_1 = __importDefault(require("javascript-time-ago"));
var en_1 = __importDefault(require("javascript-time-ago/locale/en"));
var Util_1 = require("./Util");
var demo_fs_map_json_1 = require("./demo.fs_map.json");
var typedef_1 = require("../typedef");
javascript_time_ago_1.default.addLocale(en_1.default);
var timeAgo = new javascript_time_ago_1.default('en-US');
for (var id in demo_fs_map_json_1.fileMap) {
    demo_fs_map_json_1.fileMap[id].modDate = new Date(demo_fs_map_json_1.fileMap[id].modDate);
}
var CurrentYear = new Date().getFullYear();
var FileUtil = /** @class */ (function () {
    function FileUtil() {
    }
    FileUtil.sortFiles = function (rawFiles, options, sortProperty, sortOrder) {
        var files = rawFiles.slice(0);
        if (!options[typedef_1.Option.ShowHidden]) {
            files = files.filter(function (f) { return f === null || f.name.charAt(0) !== '.'; });
        }
        var comparator = FileUtil.prepareComparator(options[typedef_1.Option.FoldersFirst], sortProperty, sortOrder);
        files.sort(comparator);
        var fileIndexMap = {};
        for (var i = 0; i < files.length; ++i) {
            var file = files[i];
            if (Util_1.isNil(file))
                continue;
            fileIndexMap[file.id] = i;
        }
        return [files, fileIndexMap];
    };
    FileUtil.getDemoFs = function () {
        // @ts-ignore
        return { demoFileMap: demo_fs_map_json_1.fileMap, demoRootFolderId: demo_fs_map_json_1.rootFolderId };
    };
    FileUtil.relativeDate = function (date) { return timeAgo.format(date); };
    FileUtil.readableDate = function (date) {
        var currentYear = date.getFullYear() === CurrentYear;
        if (currentYear)
            return dateformat_1.default(date, 'd mmmm, HH:MM');
        return dateformat_1.default(date, 'd mmmm yyyy, HH:MM');
    };
    FileUtil.readableSize = function (size) {
        var sizeData = filesize_1.default(size, { bits: false, output: 'object' });
        if (sizeData.symbol === 'B') {
            return Math.round(sizeData.value / 10) / 100.0 + " KB";
        }
        else if (sizeData.symbol === 'KB') {
            return Math.round(sizeData.value) + " " + sizeData.symbol;
        }
        return sizeData.value + " " + sizeData.symbol;
    };
    FileUtil.prepareComparator = function (foldersFirst, sortProperty, sortOrder) {
        return function (fileA, fileB) {
            // If file is `null` (i.e. is loading) show it last
            if (Util_1.isNil(fileA))
                return 1;
            if (Util_1.isNil(fileB))
                return -1;
            if (foldersFirst) {
                if (fileA.isDir === true && fileB.isDir !== true)
                    return -1;
                else if (fileA.isDir !== true && fileB.isDir === true)
                    return 1;
            }
            var returnVal = sortOrder === typedef_1.SortOrder.Asc ? 1 : -1;
            var propA;
            var propB;
            if (Util_1.isFunction(sortProperty)) {
                propA = sortProperty(fileA);
                propB = sortProperty(fileB);
            }
            else {
                propA = fileA[sortProperty];
                propB = fileB[sortProperty];
            }
            var aIsNil = Util_1.isNil(propA);
            var bIsNil = Util_1.isNil(propB);
            if (aIsNil && bIsNil)
                return 0;
            else if (aIsNil)
                return -returnVal;
            else if (bIsNil)
                return returnVal;
            else if (propA > propB)
                return returnVal;
            else if (propA === propB)
                return 0;
            else
                return -returnVal;
        };
    };
    return FileUtil;
}());
exports.FileUtil = FileUtil;
//# sourceMappingURL=FileUtil.js.map