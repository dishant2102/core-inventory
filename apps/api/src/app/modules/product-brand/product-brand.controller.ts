import { NestAuthAuthGuard } from '@ackplus/nest-auth';
import { Crud } from '@ackplus/nest-crud';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProductBrandDTO } from './dto/create-product-brand.dto';
import { UpdateProductBrandDTO } from './dto/update-product-brand.dto';
import { ProductBrand } from './product-brand.entity';
import { ProductBrandService } from './product-brand.service';


@ApiTags('Product Brand')
@UseGuards(NestAuthAuthGuard)
@Crud({
    entity: ProductBrand,
    name: 'ProductBrand',
    path: 'product-brand',
    softDelete: true,
    dto: {
        create: CreateProductBrandDTO,
        update: UpdateProductBrandDTO,
    },
})
export class ProductBrandController {

    constructor(private service: ProductBrandService) { }

}
