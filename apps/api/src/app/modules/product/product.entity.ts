import { DiscountTypeEnum, ProductStatusEnum } from '@libs/types';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '../../core/typeorm/core.entity';
import { ProductCategory } from '../product-category/product-category.entity';
import { ProductBrand } from '../product-brand/product-brand.entity';


@Entity()
export class Product extends CoreEntity {

    @ApiProperty({ type: String })
    @IsString()
    @Column()
    name?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true, unique: true })
    sku?: string;

    @ApiProperty({ type: Number, nullable: true })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Column('decimal', { precision: 10, scale: 2, nullable: true, default: 0 })
    price?: number;

    @ApiProperty({ type: Number, nullable: true })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Column('decimal', { precision: 10, scale: 2, nullable: true, default: 0 })
    discount?: number;

    @ApiProperty({
        type: DiscountTypeEnum,
        enum: DiscountTypeEnum,
        enumName: 'DiscountTypeEnum',
        nullable: true,
    })
    @IsEnum(DiscountTypeEnum)
    @IsOptional()
    @Column('text', { nullable: true, default: DiscountTypeEnum.PERCENTAGE })
    discountType?: DiscountTypeEnum;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    shortDescription?: string;

    @ApiProperty({ type: String, nullable: true })
    @IsString()
    @IsOptional()
    @Column('text', { nullable: true })
    description?: string;

    @ApiProperty({
        type: ProductStatusEnum,
        enum: ProductStatusEnum,
        enumName: 'ProductStatusEnum',
        example: ProductStatusEnum.ACTIVE,
    })
    @IsEnum(ProductStatusEnum)
    @IsOptional()
    @Column('text', { default: ProductStatusEnum.ACTIVE })
    status?: ProductStatusEnum;

    @ApiProperty({ type: String, format: 'uuid', nullable: true })
    @IsUUID()
    @IsOptional()
    @Column({ nullable: true })
    categoryId?: string;

    @ApiProperty({ type: () => ProductCategory, nullable: true })
    @ManyToOne(() => ProductCategory, (category) => category.products, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    category?: ProductCategory;

    @ApiProperty({ type: String, format: 'uuid', nullable: true })
    @IsUUID()
    @IsOptional()
    @Column({ nullable: true })
    brandId?: string;

    @ApiProperty({ type: () => ProductBrand, nullable: true })
    @ManyToOne(() => ProductBrand, (brand) => brand.products, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    brand?: ProductBrand;

}
