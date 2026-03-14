import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LocationStatus } from '../location.entity';


export class CreateLocationDTO {
    @ApiProperty({ type: String })
    @IsString()
    name: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    code?: string;

    @ApiProperty({ enum: LocationStatus, default: LocationStatus.ACTIVE })
    @IsEnum(LocationStatus)
    @IsOptional()
    status?: LocationStatus;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    warehouseId?: string;
}

export class UpdateLocationDTO extends PartialType(CreateLocationDTO) { }
