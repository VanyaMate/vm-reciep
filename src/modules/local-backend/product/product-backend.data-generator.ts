import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    CreateProductDto,
} from '@/modules/local-backend/product/product-backend.types.ts';
import { IDataGenerator } from '@vanyamate/market-place-service';


export class ProductBackendDataGenerator implements IDataGenerator<Product, CreateProductDto> {
    private _clearData: Product = {
        allergens        : '',
        available        : false,
        barcode          : 0,
        brand            : '',
        brand_name       : '',
        calcium          : 0,
        calories         : 0,
        carbohydrates    : 0,
        category         : '',
        country_of_origin: '',
        description      : '',
        expiration_date  : '',
        fat              : 0,
        fiber            : 0,
        image_url        : '',
        images           : [],
        ingredients      : '',
        iron             : 0,
        manufacturer     : '',
        net_weight       : 0,
        nutritional_facts: '',
        price            : 0,
        product_name     : '',
        protein          : 0,
        quantity         : 0,
        rating           : 0,
        reviews          : 0,
        serving_size     : 0,
        sugar            : 0,
        vitamin_a        : 0,
        vitamin_c        : 0,
        weight           : 0,
    };

    public allergens (): Product['allergens'] {
        return '';
    }

    public available (): Product['available'] {
        return false;
    }

    public barcode (): Product['barcode'] {
        return 0;
    }

    public brand (): Product['brand'] {
        return '';
    }

    public brand_name (): Product['brand_name'] {
        return '';
    }

    public byData (data: CreateProductDto): Product {
        return {
            ...this._clearData,
            ...data,
        };
    }

    public calcium (): Product['calcium'] {
        return 0;
    }

    public calories (): Product['calories'] {
        return 0;
    }

    public carbohydrates (): Product['carbohydrates'] {
        return 0;
    }

    public category (): Product['category'] {
        return ''; // TODO: Поменять категорию
    }

    public clear (): Product {
        return { ...this._clearData };
    }

    public country_of_origin (): Product['country_of_origin'] {
        return '';
    }

    public description (): Product['description'] {
        return '';
    }

    public expiration_date (): Product['expiration_date'] {
        return '';
    }

    public fat (): Product['fat'] {
        return 0;
    }

    public fiber (): Product['fiber'] {
        return 0;
    }

    public filled (data: CreateProductDto | undefined): Product {
        return {
            allergens        : this.allergens(),
            available        : this.available(),
            barcode          : this.barcode(),
            brand            : this.brand(),
            brand_name       : this.brand_name(),
            calcium          : this.calcium(),
            calories         : this.calories(),
            carbohydrates    : this.carbohydrates(),
            category         : this.category(),
            country_of_origin: this.country_of_origin(),
            description      : this.description(),
            expiration_date  : this.expiration_date(),
            fat              : this.fat(),
            fiber            : this.fiber(),
            image_url        : this.image_url(),
            images           : this.images(),
            ingredients      : this.ingredients(),
            iron             : this.iron(),
            manufacturer     : this.manufacturer(),
            net_weight       : this.net_weight(),
            nutritional_facts: this.nutritional_facts(),
            price            : this.price(),
            product_name     : this.product_name(),
            protein          : this.protein(),
            quantity         : this.quantity(),
            rating           : this.rating(),
            reviews          : this.reviews(),
            serving_size     : this.serving_size(),
            sugar            : this.sugar(),
            vitamin_a        : this.vitamin_a(),
            vitamin_c        : this.vitamin_c(),
            weight           : this.weight(),
            ...data,
        };
    }

    public image_url (): Product['image_url'] {
        return '';
    }

    public images (): Product['images'] {
        return [];
    }

    public ingredients (): Product['ingredients'] {
        return '';
    }

    public iron (): Product['iron'] {
        return 0;
    }

    public manufacturer (): Product['manufacturer'] {
        return '';
    }

    public net_weight (): Product['net_weight'] {
        return 0;
    }

    public nutritional_facts (): Product['nutritional_facts'] {
        return '';
    }

    public price (): Product['price'] {
        return 0;
    }

    public product_name (): Product['product_name'] {
        return '';
    }

    public protein (): Product['protein'] {
        return 0;
    }

    public quantity (): Product['quantity'] {
        return 0;
    }

    public rating (): Product['rating'] {
        return 0;
    }

    public reviews (): Product['reviews'] {
        return 0;
    }

    public serving_size (): Product['serving_size'] {
        return 0;
    }

    public sugar (): Product['sugar'] {
        return 0;
    }

    public vitamin_a (): Product['vitamin_a'] {
        return 0;
    }

    public vitamin_c (): Product['vitamin_c'] {
        return 0;
    }

    public weight (): Product['weight'] {
        return 0;
    }

}