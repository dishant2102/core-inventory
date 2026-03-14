import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/service/base-service';
import { BaseRepository } from '../../core/typeorm/base-repository';
import { Location } from './location.entity';


@Injectable()
export class LocationService extends BaseService<Location> {
    constructor(
        @InjectRepository(Location)
        public readonly locationRepository: BaseRepository<Location>,
    ) {
        super(locationRepository);
    }
}
