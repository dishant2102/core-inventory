import { PartialType } from '@nestjs/swagger';

import { CreateProductCategoryDTO } from './create-product-category.dto';


export class UpdateProductCategoryDTO extends PartialType(CreateProductCategoryDTO) { }
