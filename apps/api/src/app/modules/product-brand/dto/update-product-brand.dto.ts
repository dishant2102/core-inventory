import { PartialType } from '@nestjs/swagger';

import { CreateProductBrandDTO } from './create-product-brand.dto';


export class UpdateProductBrandDTO extends PartialType(CreateProductBrandDTO) { }
