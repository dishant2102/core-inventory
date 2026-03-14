import { IBaseEntity } from './base-entity';


export interface IProductCategory extends IBaseEntity {
    name?: string;
    description?: string;
}
