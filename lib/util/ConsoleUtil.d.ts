/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
export default class ConsoleUtil {
    static log: (...inputArgs: any) => void;
    static warn: (...inputArgs: any) => void;
    static error: (...inputArgs: any) => void;
    static logInternalException: (error: Error, action: string) => void;
    static logUnhandledUserException: (error: Error, action: string) => void;
}
