import { NestAuthModule } from '@ackplus/nest-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductBrandController } from './product-brand.controller';
import { ProductBrand } from './product-brand.entity';
import { ProductBrandService } from './product-brand.service';
import { Product } from '../product/product.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductBrand, Product]),
        NestAuthModule,
        ConfigModule,
    ],
    providers: [ProductBrandService],
    controllers: [ProductBrandController],
    exports: [ProductBrandService],
})
export class ProductBrandModule { }
