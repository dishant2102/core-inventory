import { ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
} from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { CoreEntity } from '../../core/typeorm/core.entity';
import { Product } from '../product/product.entity';


@Entity()
export class ProductBrand extends CoreEntity {

    @ApiProperty({ type: String })
    @IsString()
    @Column()
    name?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column('text', { nullable: true })
    description?: string;

    @ApiProperty({ type: () => [Product], nullable: true })
    @OneToMany(() => Product, (product) => product.brand, { nullable: true })
    products?: Product[];

}
