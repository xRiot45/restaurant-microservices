import { Injectable, SetMetadata } from '@nestjs/common';
import { ClassType } from 'libs/types';

export const DECORATOR_KEY = 'isPipe';

export function Pipe(): ClassDecorator {
    return ((target: ClassType<unknown>) => {
        Injectable()(target);
        SetMetadata(DECORATOR_KEY, true)(target);
    }) as ClassDecorator;
}
