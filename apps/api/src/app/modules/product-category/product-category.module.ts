import { NestAuthModule } from '@ackplus/nest-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoryController } from './product-category.controller';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryService } from './product-category.service';
import { Product } from '../product/product.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCategory, Product]),
        NestAuthModule,
        ConfigModule,
    ],
    providers: [ProductCategoryService],
    controllers: [ProductCategoryController],
    exports: [ProductCategoryService],
})
export class ProductCategoryModule { }
