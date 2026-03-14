import { NestAuthAuthGuard } from '@ackplus/nest-auth';
import { Crud } from '@ackplus/nest-crud';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from './dto/update-product-category.dto';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryService } from './product-category.service';


@ApiTags('Product Category')
@UseGuards(NestAuthAuthGuard)
@Crud({
    entity: ProductCategory,
    name: 'ProductCategory',
    path: 'product-category',
    softDelete: true,
    dto: {
        create: CreateProductCategoryDTO,
        update: UpdateProductCategoryDTO,
    },
})
export class ProductCategoryController {

    constructor(private service: ProductCategoryService) { }

}
