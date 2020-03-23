import React from 'react';
import { Icon, icons } from './Icon';
export interface ConfigValue {
    icons: typeof icons;
    Icon: typeof Icon;
}
export declare const ConfigContext: React.Context<ConfigValue>;
