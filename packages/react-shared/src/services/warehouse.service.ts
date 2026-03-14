import { IWarehouse } from '@libs/types';

import { CRUDService } from './crud-service';


export class WarehouseService extends CRUDService<IWarehouse> {
    protected apiPath = 'warehouse';
}
