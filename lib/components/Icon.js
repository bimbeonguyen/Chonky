"use strict";
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
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var faCheckCircle_1 = require("@fortawesome/free-solid-svg-icons/faCheckCircle");
var faArrowDown_1 = require("@fortawesome/free-solid-svg-icons/faArrowDown");
var faList_1 = require("@fortawesome/free-solid-svg-icons/faList");
var faFolder_1 = require("@fortawesome/free-solid-svg-icons/faFolder");
var faFolderPlus_1 = require("@fortawesome/free-solid-svg-icons/faFolderPlus");
var faTh_1 = require("@fortawesome/free-solid-svg-icons/faTh");
var faThLarge_1 = require("@fortawesome/free-solid-svg-icons/faThLarge");
var faArrowUp_1 = require("@fortawesome/free-solid-svg-icons/faArrowUp");
var faCircle_1 = require("@fortawesome/free-solid-svg-icons/faCircle");
var faChevronRight_1 = require("@fortawesome/free-solid-svg-icons/faChevronRight");
var faDownload_1 = require("@fortawesome/free-solid-svg-icons/faDownload");
var faUpload_1 = require("@fortawesome/free-solid-svg-icons/faUpload");
var faTrash_1 = require("@fortawesome/free-solid-svg-icons/faTrash");
var faLevelUpAlt_1 = require("@fortawesome/free-solid-svg-icons/faLevelUpAlt");
var faExclamationTriangle_1 = require("@fortawesome/free-solid-svg-icons/faExclamationTriangle");
var faChevronDown_1 = require("@fortawesome/free-solid-svg-icons/faChevronDown");
var faFolderOpen_1 = require("@fortawesome/free-solid-svg-icons/faFolderOpen");
var faExternalLinkAlt_1 = require("@fortawesome/free-solid-svg-icons/faExternalLinkAlt");
var faEyeSlash_1 = require("@fortawesome/free-solid-svg-icons/faEyeSlash");
var faBalanceScale_1 = require("@fortawesome/free-solid-svg-icons/faBalanceScale");
var faFileCode_1 = require("@fortawesome/free-solid-svg-icons/faFileCode");
var faCogs_1 = require("@fortawesome/free-solid-svg-icons/faCogs");
var faCubes_1 = require("@fortawesome/free-solid-svg-icons/faCubes");
var faDatabase_1 = require("@fortawesome/free-solid-svg-icons/faDatabase");
var faFileAlt_1 = require("@fortawesome/free-solid-svg-icons/faFileAlt");
var faFileArchive_1 = require("@fortawesome/free-solid-svg-icons/faFileArchive");
var faFileExcel_1 = require("@fortawesome/free-solid-svg-icons/faFileExcel");
var faFileImage_1 = require("@fortawesome/free-solid-svg-icons/faFileImage");
var faFilePdf_1 = require("@fortawesome/free-solid-svg-icons/faFilePdf");
var faFileWord_1 = require("@fortawesome/free-solid-svg-icons/faFileWord");
var faFilm_1 = require("@fortawesome/free-solid-svg-icons/faFilm");
var faInfoCircle_1 = require("@fortawesome/free-solid-svg-icons/faInfoCircle");
var faKey_1 = require("@fortawesome/free-solid-svg-icons/faKey");
var faLock_1 = require("@fortawesome/free-solid-svg-icons/faLock");
var faMusic_1 = require("@fortawesome/free-solid-svg-icons/faMusic");
var faRunning_1 = require("@fortawesome/free-solid-svg-icons/faRunning");
var faTerminal_1 = require("@fortawesome/free-solid-svg-icons/faTerminal");
var faUsers_1 = require("@fortawesome/free-solid-svg-icons/faUsers");
var faAdobe_1 = require("@fortawesome/free-brands-svg-icons/faAdobe");
var faGitAlt_1 = require("@fortawesome/free-brands-svg-icons/faGitAlt");
var faLinux_1 = require("@fortawesome/free-brands-svg-icons/faLinux");
var faNodeJs_1 = require("@fortawesome/free-brands-svg-icons/faNodeJs");
var faPhp_1 = require("@fortawesome/free-brands-svg-icons/faPhp");
var faPython_1 = require("@fortawesome/free-brands-svg-icons/faPython");
var faUbuntu_1 = require("@fortawesome/free-brands-svg-icons/faUbuntu");
var faCircleNotch_1 = require("@fortawesome/free-solid-svg-icons/faCircleNotch");
var faFile_1 = require("@fortawesome/free-solid-svg-icons/faFile");
exports.icons = {
    checkActive: faCheckCircle_1.faCheckCircle,
    checkInactive: faCircle_1.faCircle,
    desc: faArrowDown_1.faArrowDown,
    asc: faArrowUp_1.faArrowUp,
    list: faList_1.faList,
    folder: faFolder_1.faFolder,
    folderCreate: faFolderPlus_1.faFolderPlus,
    folderOpen: faFolderOpen_1.faFolderOpen,
    smallThumbnail: faTh_1.faTh,
    largetThumbnail: faThLarge_1.faThLarge,
    angleRight: faChevronRight_1.faChevronRight,
    angleDown: faChevronDown_1.faChevronDown,
    download: faDownload_1.faDownload,
    upload: faUpload_1.faUpload,
    trash: faTrash_1.faTrash,
    directoryUp: faLevelUpAlt_1.faLevelUpAlt,
    fallbackIcon: faExclamationTriangle_1.faExclamationTriangle,
    symlink: faExternalLinkAlt_1.faExternalLinkAlt,
    hidden: faEyeSlash_1.faEyeSlash,
    loading: faCircleNotch_1.faCircleNotch,
    // file types
    file: faFile_1.faFile,
    license: faBalanceScale_1.faBalanceScale,
    code: faFileCode_1.faFileCode,
    config: faCogs_1.faCogs,
    model: faCubes_1.faCubes,
    database: faDatabase_1.faDatabase,
    text: faFileAlt_1.faFileAlt,
    archive: faFileArchive_1.faFileArchive,
    csv: faFileExcel_1.faFileExcel,
    image: faFileImage_1.faFileImage,
    pdf: faFilePdf_1.faFilePdf,
    word: faFileWord_1.faFileWord,
    video: faFilm_1.faFilm,
    info: faInfoCircle_1.faInfoCircle,
    key: faKey_1.faKey,
    lock: faLock_1.faLock,
    music: faMusic_1.faMusic,
    flash: faRunning_1.faRunning,
    terminal: faTerminal_1.faTerminal,
    authors: faUsers_1.faUsers,
    adobe: faAdobe_1.faAdobe,
    git: faGitAlt_1.faGitAlt,
    linux: faLinux_1.faLinux,
    nodejs: faNodeJs_1.faNodeJs,
    php: faPhp_1.faPhp,
    python: faPython_1.faPython,
    ubuntu: faUbuntu_1.faUbuntu,
};
exports.Icon = function (props) {
    return react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, __assign({}, props));
};
//# sourceMappingURL=Icon.js.map