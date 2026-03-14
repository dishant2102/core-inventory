import { NestAuthModule } from '@ackplus/nest-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        NestAuthModule,
        ConfigModule,
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService],
})
export class ProductModule { }
