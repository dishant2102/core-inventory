import { IBaseEntity } from './base-entity';


export enum WarehouseStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export interface IWarehouse extends IBaseEntity {
    name?: string;
    code?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    email?: string;
    phone?: string;
    status?: WarehouseStatusEnum;
    locations?: ILocation[];
}

export enum LocationStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export interface ILocation extends IBaseEntity {
    name?: string;
    code?: string;
    status?: LocationStatusEnum;
    warehouseId?: string;
    warehouse?: IWarehouse;
}
