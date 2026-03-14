import { PartialType } from '@nestjs/swagger';

import { ProductCategory } from '../product-category.entity';


export class CreateProductCategoryDTO extends PartialType(ProductCategory) { }
