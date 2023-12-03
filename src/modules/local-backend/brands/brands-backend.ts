import {
    MultiplyService,
    StorageService,
} from '@vanyamate/market-place-service';
import { LBSN_BRAND } from '@/modules/local-backend/storages.ts';
import { Brand } from '@/modules/api/brand/brand-service.types.ts';
import brands from '@vanyamate/market-place-service/data/brands/brands_1.json';


export class BrandsBackend extends MultiplyService<Brand> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LBSN_BRAND,
            ),
            {
                options: {
                    timeout      : 100,
                    items        : brands,
                    findOneFilter: (brand, id) => brand.title === id,
                },
            },
        );
    }
}