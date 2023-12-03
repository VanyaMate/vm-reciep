import {
    MultiplyService,
    StorageService,
} from '@vanyamate/market-place-service';
import { Brand } from '@/modules/local-backend/brand/brand-backend.types.ts';
import { LBSN_BRAND } from '@/modules/local-backend/storages.ts';


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
                    items        : [],
                    findOneFilter: (brand, id) => brand.id === id,
                },
            },
        );
    }
}