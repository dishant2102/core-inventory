import { NestAuthModule } from '@ackplus/nest-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WarehouseController } from './warehouse.controller';
import { Warehouse } from './warehouse.entity';
import { WarehouseService } from './warehouse.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Warehouse]),
        NestAuthModule,
        ConfigModule,
    ],
    providers: [WarehouseService],
    controllers: [WarehouseController],
    exports: [WarehouseService],
})
export class WarehouseModule { }
