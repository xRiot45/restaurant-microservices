import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    isActive: boolean;
}
