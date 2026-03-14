import { ILocation } from '@libs/types';

import { CRUDService } from './crud-service';


export class LocationService extends CRUDService<ILocation> {
    protected apiPath = 'location';
}
