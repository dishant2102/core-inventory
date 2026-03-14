import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { BaseService } from '../../core/service/base-service';
import { BaseRepository } from '../../core/typeorm/base-repository';


@Injectable()
export class ProductService extends BaseService<Product> {

    constructor(
        @InjectRepository(Product)
        public readonly productRepository: BaseRepository<Product>,
    ) {
        super(productRepository);
    }

}
