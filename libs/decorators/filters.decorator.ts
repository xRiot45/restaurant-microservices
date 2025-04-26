import { Injectable, SetMetadata } from '@nestjs/common';
import { ClassType } from 'libs/types';

export const DECORATOR_KEY = 'isFilters';
export const FILTERS_KEY = 'filters';

export function Filters(filters: ClassType<unknown>): ClassDecorator {
    return ((target: ClassType<unknown>) => {
        SetMetadata(DECORATOR_KEY, true)(target);
        SetMetadata(FILTERS_KEY, filters)(target);
        Injectable()(target);
    }) as ClassDecorator;
}
