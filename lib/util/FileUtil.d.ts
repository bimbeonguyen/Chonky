/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import { Nullable } from 'tsdef';
import { FileArray, FileData, FileIndexMap, FileMap, Options, SortOrder } from '../typedef';
export declare class FileUtil {
    static relativeDate: (date: Date) => string;
    static readableDate: (date: Date) => string;
    static readableSize: (size: number) => string;
    static prepareComparator: (foldersFirst: boolean, sortProperty: string | ((file: FileData) => any), sortOrder: SortOrder) => (fileA: Nullable<FileData>, fileB: Nullable<FileData>) => number;
    static sortFiles(rawFiles: Nullable<FileData>[], options: Options, sortProperty: string | ((file: FileData) => any), sortOrder: SortOrder): [FileArray, FileIndexMap];
    static getDemoFs(): {
        demoFileMap: FileMap;
        demoRootFolderId: string;
    };
}
