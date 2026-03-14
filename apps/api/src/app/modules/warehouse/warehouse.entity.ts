import { ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
    IsEmail,
    IsBoolean,
} from 'class-validator';
import { Column, Entity } from 'typeorm';

import { CoreEntity } from '../../core/typeorm/core.entity';


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

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    status?: string;

}
