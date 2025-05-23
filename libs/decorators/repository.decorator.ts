import { Injectable, SetMetadata } from '@nestjs/common';
import { ClassType } from 'libs/types';

export const DECORATOR_KEY = 'isRepository';
export const ENTITY_KEY = 'entity';

// export function Repository(entity: EntityTarget<unknown>): ClassDecorator {
//     return ((target: ClassType<unknown>) => {
//         SetMetadata(DECORATOR_KEY, true)(target);
//         SetMetadata(ENTITY_KEY, entity)(target);
//         Injectable()(target);
//     }) as ClassDecorator;
// }

export function Repository(): ClassDecorator {
    return ((target: ClassType<unknown>) => {
        Injectable()(target);
        SetMetadata(DECORATOR_KEY, true)(target);
    }) as ClassDecorator;
}
