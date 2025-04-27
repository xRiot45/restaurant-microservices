import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RBAC_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: '127.0.0.1',
                    port: 3001,
                },
            },
        ]),
    ],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
