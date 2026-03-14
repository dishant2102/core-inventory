import { NestAuthAuthGuard } from '@ackplus/nest-auth';
import { Crud } from '@ackplus/nest-crud';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';


@ApiTags('Product')
@UseGuards(NestAuthAuthGuard)
@Crud({
    entity: Product,
    name: 'Product',
    path: 'product',
    softDelete: true,
    dto: {
        create: CreateProductDTO,
        update: UpdateProductDTO,
    },
})
export class ProductController {

    constructor(private service: ProductService) { }

}
