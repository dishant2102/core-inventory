import { NestAuthAuthGuard } from '@ackplus/nest-auth';
import { Crud } from '@ackplus/nest-crud';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateLocationDTO, UpdateLocationDTO } from './dto/location.dto';
import { Location } from './location.entity';
import { LocationService } from './location.service';


@ApiTags('Location')
@UseGuards(NestAuthAuthGuard)
@Crud({
    entity: Location,
    name: 'Location',
    path: 'location',
    softDelete: true,
    dto: {
        create: CreateLocationDTO,
        update: UpdateLocationDTO,
    },
})
export class LocationController {
    constructor(private service: LocationService) { }
}
