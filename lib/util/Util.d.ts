/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import { AnyFunction, Nilable, Nullable } from 'tsdef';
import { InputListener, KbKey } from '../typedef';
export declare const isMobileDevice: () => boolean;
export declare const isNil: (value: any) => value is null | undefined;
export declare const isNumber: (value: any) => value is number;
export declare const isBoolean: (value: any) => value is boolean;
export declare const isString: (value: any) => value is string;
export declare const isArray: (value: any) => value is any[];
export declare const isObject: (value: any) => value is object;
export declare const isFunction: (value: any) => value is AnyFunction;
export declare const getNonNil: <T>(array: Nilable<T[]>, index: number) => Nullable<T>;
export declare const clamp: (value: number, min: number, max: number) => number;
export declare const clampIndex: (value: number, array: any[]) => number;
export declare const detectKey: (event: KeyboardEvent) => Nullable<KbKey>;
export declare const handleKeyPress: (event: KeyboardEvent) => void;
export declare const setupListeners: () => void;
export declare const registerKbListener: (kbListener: InputListener) => void;
export declare const deregisterKbListener: (kbListener: InputListener) => void;
