import { NestAuthModule } from '@ackplus/nest-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Warehouse } from '../warehouse/warehouse.entity';
import { LocationController } from './location.controller';
import { Location } from './location.entity';
import { LocationService } from './location.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Location, Warehouse]),
        NestAuthModule,
        ConfigModule,
    ],
    providers: [LocationService],
    controllers: [LocationController],
    exports: [LocationService],
})
export class LocationModule { }
