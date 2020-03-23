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
var exact_trie_1 = __importDefault(require("exact-trie"));
var Util_1 = require("./Util");
var typedef_1 = require("../typedef");
var memoizee_1 = __importDefault(require("memoizee"));
var generateIcons = memoizee_1.default(function (icons) {
    var colourIndex = 0;
    var step = 5;
    var IconsToExtensions = [
        [icons.license, ['license']],
        [icons.config, ['sfk', 'ini', 'toml', 'iml']],
        [icons.model, ['3ds', 'obj', 'ply', 'fbx']],
        [icons.database, ['json', 'sql']],
        [icons.text, ['txt', 'md']],
        [icons.archive, ['zip', 'rar', 'tar', 'tar.gz']],
        [icons.csv, ['csv', 'xls', 'xlsx']],
        [icons.image, typedef_1.ImageExtensions],
        [icons.pdf, ['pdf']],
        [icons.word, ['doc', 'docx', 'odt']],
        [icons.video, typedef_1.VideoExtensions],
        [
            icons.code,
            [
                'html',
                'php',
                'css',
                'sass',
                'scss',
                'less',
                'cpp',
                'h',
                'hpp',
                'c',
                'xml',
                'ipynb',
            ],
        ],
        [icons.info, ['bib', 'readme', 'nfo']],
        [icons.key, ['pem', 'pub']],
        [icons.lock, ['lock', 'lock.json', 'shrinkwrap.json']],
        [icons.music, typedef_1.AudioExtensions],
        [icons.flash, ['swf']],
        [icons.terminal, ['run', 'sh']],
        [icons.trash, ['.Trashes']],
        [icons.authors, ['authors', 'contributors']],
        [icons.adobe, ['psd']],
        [icons.git, ['.gitignore']],
        [icons.linux, ['AppImage']],
        [icons.nodejs, ['js', 'jsx', 'ts', 'tsx', 'd.ts']],
        [icons.php, ['php']],
        [icons.python, ['py']],
        [icons.ubuntu, ['deb']],
    ];
    var exactTrie = new exact_trie_1.default();
    for (var _i = 0, IconsToExtensions_1 = IconsToExtensions; _i < IconsToExtensions_1.length; _i++) {
        var pair = IconsToExtensions_1[_i];
        var _a = pair, icon = _a[0], exts = _a[1];
        for (var i = 0; i < exts.length; ++i) {
            colourIndex += step;
            var colorCode = (colourIndex % (typedef_1.ColorsLight.length - 1)) + 1;
            exactTrie.put(exts[i], { icon: icon, colorCode: colorCode }, true);
        }
    }
    return exactTrie;
});
exports.getIconData = function (file, icons) {
    if (!Util_1.isObject(file))
        return { icon: icons.loading, colorCode: 0 };
    if (file.isDir === true)
        return { icon: icons.folder, colorCode: 0 };
    var iconMap = generateIcons(icons);
    var match = Util_1.isString(file.name)
        ? iconMap.getWithCheckpoints(file.name, '.', true)
        : null;
    return !Util_1.isNil(match) ? match : { icon: icons.file, colorCode: 32 };
};
//# sourceMappingURL=IconUtil.js.map