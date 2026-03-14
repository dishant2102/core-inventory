import { PartialType } from '@nestjs/swagger';

import { Warehouse } from '../warehouse.entity';


export class CreateWarehouseDTO extends PartialType(Warehouse) { }
