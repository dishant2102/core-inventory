import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Warehouse } from './warehouse.entity';
import { BaseService } from '../../core/service/base-service';
import { BaseRepository } from '../../core/typeorm/base-repository';


@Injectable()
export class WarehouseService extends BaseService<Warehouse> {

    constructor(
        @InjectRepository(Warehouse)
        public readonly warehouseRepository: BaseRepository<Warehouse>,
    ) {
        super(warehouseRepository);
    }

}
