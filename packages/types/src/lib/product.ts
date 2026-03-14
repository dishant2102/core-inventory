import { IBaseEntity } from './base-entity';
import { IProductCategory } from './product-category';
import { IProductBrand } from './product-brand';


export enum ProductStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

export enum DiscountTypeEnum {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export interface IProduct extends IBaseEntity {
  name?: string;
  sku?: string;
  price?: number;
  discount?: number;
  discountType?: DiscountTypeEnum;
  shortDescription?: string;
  description?: string;
  status?: ProductStatusEnum;
  categoryId?: string;
  category?: IProductCategory;
  brandId?: string;
  brand?: IProductBrand;
}
