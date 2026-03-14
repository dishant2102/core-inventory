import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductBrand } from './product-brand.entity';
import { BaseService } from '../../core/service/base-service';
import { BaseRepository } from '../../core/typeorm/base-repository';


@Injectable()
export class ProductBrandService extends BaseService<ProductBrand> {

    constructor(
        @InjectRepository(ProductBrand)
        public readonly productBrandRepository: BaseRepository<ProductBrand>,
    ) {
        super(productBrandRepository);
    }

}
