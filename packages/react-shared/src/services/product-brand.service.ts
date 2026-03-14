import { IProductBrand } from '@libs/types';

import { CRUDService } from './crud-service';


export class ProductBrandService extends CRUDService<IProductBrand> {

    protected apiPath = 'product-brand';

}
