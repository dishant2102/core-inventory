import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductCategory } from './product-category.entity';
import { BaseService } from '../../core/service/base-service';
import { BaseRepository } from '../../core/typeorm/base-repository';


@Injectable()
export class ProductCategoryService extends BaseService<ProductCategory> {

    constructor(
        @InjectRepository(ProductCategory)
        public readonly productCategoryRepository: BaseRepository<ProductCategory>,
    ) {
        super(productCategoryRepository);
    }

}
