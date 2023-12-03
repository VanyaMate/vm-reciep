import { IDataGenerator } from '@vanyamate/market-place-service';
import { getRandomInt, getRandomWords } from '@/helpers/random.ts';
import { productWordsLib } from '@/helpers/libs/product-words.lib.ts';
import {
    Brand,
    CreateBrandDto,
} from '@/modules/api/brand/brand-service.types.ts';


export class BrandBackendDataGenerator implements IDataGenerator<Brand, CreateBrandDto> {
    private readonly _clearData: Brand = {
        title      : '',
        description: '',
        avatar     : 'https://customers.seomanager.com/knowledgegraph/logo/loogguitars_myshopify_com_logo.jpg',
        admins     : [ 'root' ],
        company    : '',
    };

    admins (): Brand['admins'] {
        return [ 'root' ];
    }

    avatar (): Brand['avatar'] {
        return 'https://customers.seomanager.com/knowledgegraph/logo/loogguitars_myshopify_com_logo.jpg';
    }

    byData (data: CreateBrandDto): Brand {
        return {
            ...this._clearData,
            ...data,
        };
    }

    clear (): Brand {
        return { ...this._clearData };
    }

    description (): Brand['description'] {
        return getRandomWords(productWordsLib, 15);
    }

    filled (data: CreateBrandDto | undefined): Brand {
        return {
            title      : this.title(),
            description: this.description(),
            avatar     : this.avatar(),
            admins     : this.admins(),
            company    : this.company(),
            ...data,
        };
    }

    company (): Brand['company'] {
        return getRandomWords(productWordsLib, 1);
    }

    title (): Brand['title'] {
        return getRandomWords(productWordsLib, 2);
    }

}