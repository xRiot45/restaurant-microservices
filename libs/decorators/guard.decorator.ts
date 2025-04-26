import { Injectable, SetMetadata } from '@nestjs/common';
import { ClassType } from 'libs/types';

export const DECORATOR_KEY = 'isGuard';

export function Guard(): ClassDecorator {
    return ((target: ClassType<unknown>) => {
        Injectable()(target);
        SetMetadata(DECORATOR_KEY, true)(target);
    }) as ClassDecorator;
}
