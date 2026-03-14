import { NestAuthAuthGuard } from '@ackplus/nest-auth';
import { Crud } from '@ackplus/nest-crud';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateWarehouseDTO } from './dto/create-warehouse.dto';
import { UpdateWarehouseDTO } from './dto/update-warehouse.dto';
import { Warehouse } from './warehouse.entity';
import { WarehouseService } from './warehouse.service';


@ApiTags('Warehouse')
@UseGuards(NestAuthAuthGuard)
@Crud({
    entity: Warehouse,
    name: 'Warehouse',
    path: 'warehouse',
    softDelete: true,
    dto: {
        create: CreateWarehouseDTO,
        update: UpdateWarehouseDTO,
    },
})
export class WarehouseController {

    constructor(private service: WarehouseService) { }

}
