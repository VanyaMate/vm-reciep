import {
    MultiplyService,
    StorageService,
} from '@vanyamate/market-place-service';
import { Brand } from '@/modules/api/brand/brand-service.types.ts';
import brands from '@vanyamate/market-place-service/data/brands/brands_1.json';
import { LS_NAME__BRAND } from '@/modules/local-backend/storages.ts';


export class BrandsBackend extends MultiplyService<Brand> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__BRAND,
            ),
            {
                options: {
                    timeout      : 300,
                    items        : brands,
                    findOneFilter: (brand, id) => brand.title === id,
                },
            },
        );
    }
}