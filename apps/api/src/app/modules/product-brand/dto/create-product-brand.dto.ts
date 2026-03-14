import { PartialType } from '@nestjs/swagger';

import { ProductBrand } from '../product-brand.entity';


export class CreateProductBrandDTO extends PartialType(ProductBrand) { }
