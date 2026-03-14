import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { CoreEntity } from '../../core/typeorm/core.entity';
import { Location } from '../location/location.entity';


export enum WarehouseStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

@Entity()
export class Warehouse extends CoreEntity {

    @ApiProperty({ type: String })
    @IsString()
    @Column()
    name?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    code?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column('text', { nullable: true })
    address?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    city?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    state?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    country?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    zipCode?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsEmail()
    @IsOptional()
    @Column({ nullable: true })
    email?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    phone?: string;

    @ApiProperty({ enum: WarehouseStatus, default: WarehouseStatus.ACTIVE })
    @IsEnum(WarehouseStatus)
    @IsOptional()
    @Column({ type: 'enum', enum: WarehouseStatus, default: WarehouseStatus.ACTIVE })
    status?: WarehouseStatus;

    @ApiProperty({ type: () => [Location], nullable: true })
    @OneToMany(() => Location, (location) => location.warehouse, { nullable: true })
    locations?: Location[];

}
