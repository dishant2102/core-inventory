import { IProductCategory } from '@libs/types';

import { CRUDService } from './crud-service';


export class ProductCategoryService extends CRUDService<IProductCategory> {

    protected apiPath = 'product-category';

}
