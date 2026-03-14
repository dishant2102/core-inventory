import { IProduct } from '@libs/types';

import { CRUDService } from './crud-service';


export class ProductService extends CRUDService<IProduct> {

    protected apiPath = 'product';

}
