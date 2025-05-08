import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user-repository.abstract';
import { UserRepositoryImpl } from './repositories/user-repository.impl';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl,
        },
    ],
})
export class UsersModule {}
