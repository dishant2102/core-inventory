import { PartialType } from '@nestjs/swagger';

import { Product } from '../product.entity';


export class CreateProductDTO extends PartialType(Product) { }
