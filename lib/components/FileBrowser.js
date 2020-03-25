"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var shallow_equal_1 = require("shallow-equal");
var typedef_1 = require("../typedef");
var Util_1 = require("../util/Util");
var FileList_1 = __importDefault(require("./FileList"));
var Controls_1 = __importDefault(require("./Controls"));
var FileUtil_1 = require("../util/FileUtil");
var ConsoleUtil_1 = __importDefault(require("../util/ConsoleUtil"));
var Denque = require("denque");
var Icon_1 = require("./Icon");
var ConfigContext_1 = require("./ConfigContext");
/**
 * File browser component.
 */
var FileBrowser = /** @class */ (function (_super) {
    __extends(FileBrowser, _super);
    function FileBrowser(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = react_1.default.createRef();
        _this.selectedFilesSnapshotBeforeSingleClick = null;
        _this.setView = function (view) {
            _this.setState(function (prevState) {
                if (prevState.view !== view)
                    return { view: view };
                return null;
            });
        };
        _this.setOption = function (name, value) {
            _this.setState(function (prevState) {
                var _a;
                var options = prevState.options;
                if (options[name] !== value)
                    return { options: __assign(__assign({}, options), (_a = {}, _a[name] = value, _a)) };
                else
                    return null;
            });
        };
        _this.activateSortProperty = function (name) {
            var onSort = _this.props.onSort;
            _this.setState(function (prevState) {
                if (prevState.sortProperty !== name) {
                    onSort(name, typedef_1.SortOrder.Asc);
                    return { sortProperty: name, sortOrder: typedef_1.SortOrder.Asc };
                }
                else {
                    var sortOrder = prevState.sortOrder === typedef_1.SortOrder.Asc
                        ? typedef_1.SortOrder.Desc
                        : typedef_1.SortOrder.Asc;
                    onSort(name, sortOrder);
                    return { sortProperty: name, sortOrder: sortOrder };
                }
            });
        };
        _this.handleSelectionToggle = function (type, file, displayIndex) {
            var disableSelection = _this.props.disableSelection;
            _this.selectedFilesSnapshotBeforeSingleClick = null;
            if (disableSelection === true)
                return;
            if (type === typedef_1.SelectionType.All) {
                _this.setState(function (prevState) {
                    var sortedFiles = prevState.sortedFiles, oldSelection = prevState.selection;
                    var count = Object.keys(oldSelection).length;
                    if (count === sortedFiles.length)
                        return { selection: {} };
                    var selection = {};
                    for (var _i = 0, sortedFiles_1 = sortedFiles; _i < sortedFiles_1.length; _i++) {
                        var file_1 = sortedFiles_1[_i];
                        if (Util_1.isObject(file_1))
                            selection[file_1.id] = true;
                    }
                    return { selection: selection };
                });
                return;
            }
            else if (type === typedef_1.SelectionType.None) {
                _this.setState(function (prevState) {
                    var oldSelection = prevState.selection;
                    var count = Object.keys(oldSelection).length;
                    if (count === 0)
                        return null;
                    return { selection: {} };
                });
                return;
            }
            if (Util_1.isNil(file) || Util_1.isNil(displayIndex)) {
                ConsoleUtil_1.default.warn("Tried to toggle \"" + type + "\" selection without \"file\" or \"displayIndex\" specified!");
                return;
            }
            _this.setState(function (prevState) {
                var _a;
                var sortedFiles = prevState.sortedFiles, oldSelection = prevState.selection, prevI = prevState.previousSelectionIndex;
                var prevIndex = Util_1.isNumber(prevI)
                    ? Util_1.clampIndex(prevI, sortedFiles)
                    : null;
                if (type === typedef_1.SelectionType.Range && !Util_1.isNumber(prevIndex)) {
                    // Fallback to multiple selection if no previous index is available
                    type = typedef_1.SelectionType.Multiple;
                }
                var selectionIndexToPersist = displayIndex;
                if (type == typedef_1.SelectionType.Multiple || type == typedef_1.SelectionType.Range) {
                    if (Util_1.isNumber(prevIndex))
                        selectionIndexToPersist = prevIndex;
                }
                var newSelection = {};
                var oldSelected = oldSelection[file.id];
                var singleAndInOldSelection = false;
                switch (type) {
                    case typedef_1.SelectionType.Single:
                        if (file.selectable !== false) {
                            var selectionSize = Object.keys(oldSelection).length;
                            singleAndInOldSelection = oldSelected === true;
                            if (oldSelected !== true || selectionSize > 1) {
                                newSelection[file.id] = true;
                            }
                        }
                        if (Util_1.isNil(oldSelected) && file.selectable !== false)
                            newSelection[file.id] = true;
                        break;
                    case typedef_1.SelectionType.Multiple:
                        newSelection = __assign({}, oldSelection);
                        if (oldSelected === true)
                            delete newSelection[file.id];
                        else if (file.selectable !== false)
                            newSelection[file.id] = true;
                        break;
                    case typedef_1.SelectionType.Range:
                        var indexA = prevIndex;
                        var indexB = displayIndex;
                        if (indexA > indexB)
                            _a = [indexB, indexA], indexA = _a[0], indexB = _a[1];
                        for (var i = indexA; i < indexB + 1; ++i) {
                            var file_2 = sortedFiles[i];
                            if (!Util_1.isNil(file_2) && file_2.selectable !== false)
                                newSelection[file_2.id] = true;
                        }
                        break;
                }
                if (singleAndInOldSelection) {
                    _this.selectedFilesSnapshotBeforeSingleClick = _this.getFilesFromSelection(oldSelection);
                }
                return {
                    selection: newSelection,
                    previousSelectionIndex: selectionIndexToPersist,
                };
            });
        };
        _this.getFilesFromSelection = function (customSelection) {
            var _a = _this.state, sortedFiles = _a.sortedFiles, fileIndexMap = _a.fileIndexMap, stateSelection = _a.selection;
            var selection = Util_1.isNil(customSelection) ? stateSelection : customSelection;
            var queue = new Denque();
            for (var id in selection) {
                if (selection[id] !== true)
                    continue;
                var index = fileIndexMap[id];
                if (!Util_1.isNumber(index))
                    continue;
                var file = sortedFiles[index];
                if (Util_1.isNil(file))
                    continue;
                queue.push(file);
            }
            return queue.toArray();
        };
        _this.handleKeyPress = function (event) {
            var _a = _this.props, folderChain = _a.folderChain, onFileOpen = _a.onFileOpen, onDeleteFiles = _a.onDeleteFiles;
            if (!_this.isInViewport(event))
                return false;
            if (event.key === typedef_1.KbKey.Backspace) {
                var parentFolder = Util_1.getNonNil(folderChain, -2);
                if (Util_1.isNil(parentFolder) || parentFolder.openable === false)
                    return false;
                if (Util_1.isFunction(onFileOpen)) {
                    onFileOpen(parentFolder);
                    return true;
                }
            }
            else if (event.key === typedef_1.KbKey.A && event.ctrlKey) {
                _this.handleSelectionToggle(typedef_1.SelectionType.All);
                return true;
            }
            else if (event.key === typedef_1.KbKey.Escape) {
                _this.handleSelectionToggle(typedef_1.SelectionType.None);
                return true;
            }
            else if (event.key === typedef_1.KbKey.Delete) {
                var files = _this.getFilesFromSelection();
                if (files.length > 0 && Util_1.isFunction(onDeleteFiles)) {
                    onDeleteFiles(files, event);
                    return true;
                }
            }
            return false;
        };
        _this.handleFileSingleClick = function (file, displayIndex, event) {
            var onFileSingleClick = _this.props.onFileSingleClick;
            Promise.resolve()
                .then(function () {
                return Promise.resolve()
                    .then(function () {
                    if (!Util_1.isFunction(onFileSingleClick))
                        return false;
                    return onFileSingleClick(file, event);
                })
                    .catch(function (error) {
                    ConsoleUtil_1.default.logUnhandledUserException(error, 'running the single click handler');
                    return false;
                });
            })
                .then(function (preventDefault) {
                if (preventDefault === true)
                    return;
                var type = Util_1.isMobileDevice()
                    ? typedef_1.SelectionType.Multiple
                    : typedef_1.SelectionType.Single;
                if (event.ctrlKey || event.key === typedef_1.KbKey.Space)
                    type = typedef_1.SelectionType.Multiple;
                if (event.shiftKey)
                    type = typedef_1.SelectionType.Range;
                return _this.handleSelectionToggle(type, file, displayIndex);
            })
                .catch(function (error) {
                return ConsoleUtil_1.default.logInternalException(error, 'handling selection toggle.');
            });
        };
        _this.handleFileDoubleClick = function (file, displayIndex, event) {
            var _a = _this.props, onFileDoubleClick = _a.onFileDoubleClick, onFileOpen = _a.onFileOpen, onOpenFiles = _a.onOpenFiles;
            // Tried to load snapshot to make double-clicking a file when it's a part of
            // multi-file selection work correctly.
            var localSelectedFilesSnapshot = _this
                .selectedFilesSnapshotBeforeSingleClick;
            var selectedFilesSnapshot = Util_1.isNil(localSelectedFilesSnapshot)
                ? _this.getFilesFromSelection()
                : localSelectedFilesSnapshot;
            return Promise.resolve()
                .then(function () {
                return Promise.resolve()
                    .then(function () {
                    if (!Util_1.isFunction(onFileDoubleClick))
                        return false;
                    return onFileDoubleClick(file, event);
                })
                    .catch(function (error) {
                    ConsoleUtil_1.default.logUnhandledUserException(error, 'running the double click handler');
                    return false;
                });
            })
                .then(function (preventDefault) {
                if (preventDefault === true)
                    return;
                var promise = Promise.resolve();
                if (Util_1.isFunction(onFileOpen) && file.openable !== false) {
                    promise = promise
                        .then(function () { return onFileOpen(file, event); })
                        .catch(function (error) {
                        return ConsoleUtil_1.default.logUnhandledUserException(error, 'running the single file opening handler');
                    });
                }
                if (Util_1.isFunction(onOpenFiles)) {
                    var openableFiles_1 = selectedFilesSnapshot.filter(function (f) { return f.openable !== false; });
                    if (openableFiles_1.length > 0) {
                        promise = promise
                            .then(function () { return onOpenFiles(openableFiles_1, event); })
                            .catch(function (error) {
                            return ConsoleUtil_1.default.logUnhandledUserException(error, 'running the multiple file opening handler');
                        });
                    }
                }
                return promise;
            });
        };
        _this.ref = react_1.default.createRef();
        var rawFiles = props.files, folderChain = props.folderChain, propView = props.view, propOptions = props.options, propSortProperty = props.sortProperty, propSortOrder = props.sortOrder;
        var defaults = FileBrowser.defaultProps;
        var selection = {};
        var view = !Util_1.isNil(propView) ? propView : defaults.view;
        var options = __assign(__assign({}, defaults.options), propOptions);
        var sortProperty = !Util_1.isNil(propSortProperty)
            ? propSortProperty
            : defaults.sortProperty;
        var sortOrder = !Util_1.isNil(propSortOrder)
            ? propSortOrder
            : defaults.sortOrder;
        var _a = FileUtil_1.FileUtil.sortFiles(rawFiles, options, sortProperty, sortOrder), sortedFiles = _a[0], fileIndexMap = _a[1];
        _this.state = {
            rawFiles: rawFiles,
            folderChain: folderChain,
            sortedFiles: sortedFiles,
            fileIndexMap: fileIndexMap,
            selection: selection,
            view: view,
            options: options,
            sortProperty: sortProperty,
            sortOrder: sortOrder,
        };
        return _this;
    }
    FileBrowser.prototype.componentDidMount = function () {
        Util_1.registerKbListener(this.handleKeyPress);
    };
    FileBrowser.prototype.componentWillUnmount = function () {
        Util_1.deregisterKbListener(this.handleKeyPress);
    };
    FileBrowser.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var old = this.props;
        var files = nextProps.files, folderChain = nextProps.folderChain, onSelectionChange = nextProps.onSelectionChange, disableSelection = nextProps.disableSelection, view = nextProps.view, options = nextProps.options, sortProperty = nextProps.sortProperty, sortOrder = nextProps.sortOrder;
        var selectionStatus = typedef_1.SelectionStatus.Ok;
        if (!shallow_equal_1.shallowEqualArrays(files, old.files)) {
            selectionStatus = typedef_1.SelectionStatus.NeedsCleaning;
            this.setState({ rawFiles: files });
        }
        if (!shallow_equal_1.shallowEqualArrays(folderChain, old.folderChain)) {
            if (!Util_1.isArray(folderChain) ||
                Util_1.getNonNil(folderChain, -1) !== Util_1.getNonNil(old.folderChain, -1)) {
                selectionStatus = typedef_1.SelectionStatus.NeedsResetting;
            }
            this.setState({ folderChain: folderChain });
        }
        if (disableSelection === true &&
            disableSelection !== old.disableSelection) {
            selectionStatus = typedef_1.SelectionStatus.NeedsResetting;
        }
        if (!Util_1.isNil(view) && view !== old.view)
            this.setState({ view: view });
        if (Util_1.isObject(options) && options !== old.options) {
            this.setState(function (prevState) { return ({
                options: __assign(__assign({}, prevState.options), options),
            }); });
        }
        if (!Util_1.isNil(sortProperty) && sortProperty !== old.sortProperty)
            this.setState({ sortProperty: sortProperty });
        if (!Util_1.isNil(sortOrder) && sortOrder !== old.sortOrder)
            this.setState({ sortOrder: sortOrder });
        if (selectionStatus === typedef_1.SelectionStatus.NeedsResetting) {
            this.setState(function () {
                var selection = {};
                if (Util_1.isFunction(onSelectionChange))
                    onSelectionChange(selection);
                return { selection: selection, previousSelectionIndex: undefined };
            });
        }
        else if (selectionStatus === typedef_1.SelectionStatus.NeedsCleaning) {
            this.setState(function (prevState) {
                var files = prevState.rawFiles, oldSelection = prevState.selection, prevIndex = prevState.previousSelectionIndex;
                var selection = {};
                var previousSelectionIndex = undefined;
                if (Util_1.isArray(files)) {
                    previousSelectionIndex = Util_1.isNumber(prevIndex)
                        ? Util_1.clampIndex(prevIndex, files)
                        : undefined;
                    files.map(function (file) {
                        if (!Util_1.isObject(file))
                            return;
                        var wasSelected = oldSelection[file.id] === true;
                        var canBeSelected = file.selectable !== false;
                        if (wasSelected && canBeSelected)
                            selection[file.id] = true;
                    });
                }
                if (Util_1.isFunction(onSelectionChange))
                    onSelectionChange(selection);
                return { selection: selection, previousSelectionIndex: previousSelectionIndex };
            });
        }
    };
    FileBrowser.prototype.componentDidUpdate = function (prevProps, prevState) {
        var onSelectionChange = this.props.onSelectionChange;
        var oldRawFiles = prevState.rawFiles, oldSelection = prevState.selection, oldOptions = prevState.options, oldSortProperty = prevState.sortProperty, oldSortOrder = prevState.sortOrder;
        var _a = this.state, rawFiles = _a.rawFiles, selection = _a.selection, options = _a.options, sortProperty = _a.sortProperty, sortOrder = _a.sortOrder;
        var justChangedSelection = false;
        var needToResort = !shallow_equal_1.shallowEqualArrays(rawFiles, oldRawFiles) ||
            !shallow_equal_1.shallowEqualObjects(options, oldOptions) ||
            sortProperty !== oldSortProperty ||
            sortOrder !== oldSortOrder;
        if (needToResort) {
            var _b = FileUtil_1.FileUtil.sortFiles(rawFiles, options, sortProperty, sortOrder), sortedFiles = _b[0], fileIndexMap = _b[1];
            var newState = { sortedFiles: sortedFiles, fileIndexMap: fileIndexMap };
            var newSelection = {};
            var additionCount = 0;
            for (var _i = 0, sortedFiles_2 = sortedFiles; _i < sortedFiles_2.length; _i++) {
                var file = sortedFiles_2[_i];
                if (Util_1.isNil(file) || selection[file.id] !== true)
                    continue;
                newSelection[file.id] = true;
                additionCount++;
            }
            if (additionCount !== Object.keys(selection).length) {
                newState.selection = newSelection;
                justChangedSelection = true;
            }
            this.setState(newState);
        }
        if (!justChangedSelection &&
            selection !== oldSelection &&
            Util_1.isFunction(onSelectionChange)) {
            onSelectionChange(selection);
        }
    };
    /**
     * The method that returns the current file selection. The return value is an object where each key
     * represents a file ID, and value of `true` indicates that the object should be selected. This object is read-only.
     * [See relevant section](#section-managing-file-selection).
     * @public
     */
    FileBrowser.prototype.getSelection = function () {
        var selection = this.state.selection;
        return __assign({}, selection);
    };
    /**
     * A method that can be used to set the current file selection. The input should be an object where each key
     * represents a file ID, and value of `true` indicates that the object should be selected.
     * [See relevant section](#section-managing-file-selection).
     * @public
     */
    FileBrowser.prototype.setSelection = function (selection) {
        this.setState(function (prevState) {
            var sortedFiles = prevState.sortedFiles, fileIndexMap = prevState.fileIndexMap;
            var newSelection = {};
            for (var id in selection) {
                if (selection[id] !== true)
                    continue;
                var index = fileIndexMap[id];
                if (!Util_1.isNumber(index))
                    continue;
                var file = sortedFiles[index];
                if (Util_1.isNil(file))
                    continue;
                newSelection[file.id] = true;
            }
            return { selection: newSelection };
        });
    };
    FileBrowser.prototype.isInViewport = function (inputEvent, offset) {
        if (offset === void 0) { offset = 100; }
        var ref = this.ref.current;
        if (Util_1.isNil(ref))
            return false;
        var _a = ref.getBoundingClientRect(), containerTop = _a.top, containerBottom = _a.bottom;
        var doc = document.documentElement;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        var viewportHeight = Math.max(doc.clientHeight, window.innerHeight || 0);
        var outsideViewport = containerBottom + offset < 0 || containerTop - offset > viewportHeight;
        return !outsideViewport;
    };
    FileBrowser.prototype.render = function () {
        var _a = this.props, doubleClickDelay = _a.doubleClickDelay, onFileOpen = _a.onFileOpen, onFolderCreate = _a.onFolderCreate, onUploadClick = _a.onUploadClick, onDownloadFiles = _a.onDownloadFiles, onDeleteFiles = _a.onDeleteFiles, thumbnailGenerator = _a.thumbnailGenerator, fillParentContainer = _a.fillParentContainer, _b = _a.Icon, Icon = _b === void 0 ? Icon_1.Icon : _b, _c = _a.icons, icons = _c === void 0 ? {} : _c, AdditionalAction = _a.AdditionalAction;
        var _d = this.state, folderChain = _d.folderChain, sortedFiles = _d.sortedFiles, selection = _d.selection, view = _d.view, options = _d.options, sortProperty = _d.sortProperty, sortOrder = _d.sortOrder;
        var className = classnames_1.default({
            chonky: true,
            'chonky-no-select': options[typedef_1.Option.DisableTextSelection],
            'chonky-fill-parent': fillParentContainer === true,
        });
        return (react_1.default.createElement(ConfigContext_1.ConfigContext.Provider, { value: { Icon: Icon, icons: __assign(__assign({}, Icon_1.icons), icons) } },
            react_1.default.createElement("div", { ref: this.ref, className: className },
                react_1.default.createElement(Controls_1.default, { folderChain: folderChain, selection: selection, onFileOpen: onFileOpen, onFolderCreate: onFolderCreate, onUploadClick: onUploadClick, onDownloadFiles: onDownloadFiles, onDeleteFiles: onDeleteFiles, getFilesFromSelection: this.getFilesFromSelection, view: view, setView: this.setView, options: options, setOption: this.setOption, activateSortProperty: this.activateSortProperty, sortProperty: sortProperty, sortOrder: sortOrder, AdditionalAction: AdditionalAction }),
                react_1.default.createElement(FileList_1.default, { files: sortedFiles, selection: selection, doubleClickDelay: doubleClickDelay, onFileSingleClick: this.handleFileSingleClick, onFileDoubleClick: this.handleFileDoubleClick, thumbnailGenerator: thumbnailGenerator, showRelativeDates: options[typedef_1.Option.ShowRelativeDates], fillParentContainer: fillParentContainer === true, view: view }))));
    };
    FileBrowser.defaultProps = {
        onFolderCreate: undefined,
        onUploadClick: undefined,
        onDownloadFiles: undefined,
        onDeleteFiles: undefined,
        doubleClickDelay: 300,
        disableSelection: false,
        fillParentContainer: false,
        view: typedef_1.FileView.Details,
        options: {
            showHidden: true,
            foldersFirst: true,
            showRelativeDates: true,
            disableTextSelection: true,
        },
        sortProperty: typedef_1.SortProperty.Name,
        sortOrder: typedef_1.SortOrder.Asc,
    };
    return FileBrowser;
}(react_1.default.Component));
exports.default = FileBrowser;
//# sourceMappingURL=FileBrowser.js.map