/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import * as React from 'react';
import { ConfigContext } from './ConfigContext';
interface DropdownSwitchItem {
    id: string;
    icon: any;
    tooltip: string;
}
interface DropdownSwitchProps {
    activeId: string;
    items: DropdownSwitchItem[];
    onClick: (id: string) => void;
}
interface DropdownSwitchState {
}
export default class DropdownSwitch extends React.Component<DropdownSwitchProps, DropdownSwitchState> {
    static contextType: React.Context<import("./ConfigContext").ConfigValue>;
    context: React.ContextType<typeof ConfigContext>;
    render(): JSX.Element;
}
export {};
