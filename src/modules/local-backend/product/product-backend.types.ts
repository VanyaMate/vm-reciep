import { Product } from '@/modules/api/product/product-service.types.ts';


export type CreateProductDto = Pick<Product, 'barcode' | 'product_name'>;
export type UpdateProductDto = Partial<Product>;