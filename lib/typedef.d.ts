/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import { Nilable, Nullable } from 'tsdef';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare global {
    interface Window {
        _chonkyData: {
            kbListenerSet: Set<InputListener>;
        };
    }
}
export interface FileData {
    id: string;
    name: string;
    ext?: string;
    isDir?: boolean;
    isHidden?: boolean;
    isSymlink?: boolean;
    openable?: boolean;
    selectable?: boolean;
    size?: number;
    modDate?: Date;
    parentId?: string;
    childrenIds?: string[];
}
export declare type FileArray = Nullable<FileData>[];
export interface FileIndexMap {
    [id: string]: number;
}
export interface FileMap {
    [id: string]: FileData;
}
export interface Selection {
    [fileId: string]: boolean | undefined;
}
export declare enum SelectionType {
    Single = 0,
    Multiple = 1,
    Range = 2,
    All = 3,
    None = 4
}
export declare enum SelectionStatus {
    NeedsCleaning = 0,
    NeedsResetting = 1,
    Ok = 2
}
export interface IconData {
    icon: IconProp;
    colorCode: number;
}
export declare enum KbKey {
    Backspace = "backspace",
    Enter = "enter",
    Escape = "escape",
    Space = "space",
    Delete = "delete",
    A = "a"
}
export declare const kbCodeMap: {
    [code: string]: KbKey;
};
export declare const kbKeyMap: {
    [code: string]: KbKey;
};
export declare const kbKeyCodeMap: {
    [keyCode: number]: KbKey;
};
export declare enum InputEventType {
    Mouse = "mouse",
    Keyboard = "keyboard"
}
export interface InputEvent {
    type: InputEventType;
    ctrlKey: boolean;
    shiftKey: boolean;
    key?: Nilable<KbKey>;
}
export declare type InputListener = (event: InputEvent) => boolean;
export declare type ActionHandlerResult = Nilable<boolean> | Promise<Nilable<boolean>>;
export declare type SingleFileActionHandler = <T extends FileData = FileData>(file: T, event?: InputEvent) => ActionHandlerResult;
export declare type MultiFileActionHandler = <T extends FileData = FileData>(files: T[], event?: InputEvent) => ActionHandlerResult;
export declare type InternalClickHandler = (file: FileData, fileIndex: number, event: InputEvent) => void;
export declare type ThumbnailGenerator = (file: FileData) => Nilable<string> | Promise<Nilable<string>>;
export declare enum FileView {
    Details = "details",
    SmallThumbs = "small-thumbs",
    LargeThumbs = "large-thumbs"
}
export interface EntrySize {
    width: number;
    height: number;
}
export declare enum Option {
    ShowHidden = "showHidden",
    FoldersFirst = "foldersFirst",
    ShowRelativeDates = "showRelativeDates",
    DisableTextSelection = "disableTextSelection"
}
export interface Options {
    showHidden: boolean;
    foldersFirst: boolean;
    showRelativeDates: boolean;
    disableTextSelection: boolean;
}
export declare enum SortProperty {
    Name = "name",
    Size = "size",
    ModDate = "modDate"
}
export declare enum SortOrder {
    Asc = "asc",
    Desc = "desc"
}
export declare const VideoExtensions: string[];
export declare const ImageExtensions: string[];
export declare const AudioExtensions: string[];
export declare const ColorsLight: string[];
export declare const ColorsDark: string[];
