import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { CoreEntity } from '../../core/typeorm/core.entity';
import { Warehouse } from '../warehouse/warehouse.entity';


export enum LocationStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

@Entity()
export class Location extends CoreEntity {

    @ApiProperty({ type: String })
    @IsString()
    @Column()
    name?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    code?: string;

    @ApiProperty({ enum: LocationStatus, default: LocationStatus.ACTIVE })
    @IsEnum(LocationStatus)
    @IsOptional()
    @Column({ type: 'enum', enum: LocationStatus, default: LocationStatus.ACTIVE })
    status?: LocationStatus;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    warehouseId?: string;

    @ApiProperty({ type: () => Warehouse, nullable: true })
    @ManyToOne(() => Warehouse, (warehouse) => warehouse.locations, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'warehouseId' })
    warehouse?: Warehouse;

}
