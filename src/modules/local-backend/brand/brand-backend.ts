import { SingleService, StorageService } from '@vanyamate/market-place-service';
import {
    BrandBackendDataGenerator,
} from '@/modules/local-backend/brand/brand-backend.data-generator.ts';
import { LBSN_BRAND } from '@/modules/local-backend/storages.ts';
import {
    Brand,
    CreateBrandDto, UpdateBrandDto,
} from '@/modules/api/brand/brand-service.types.ts';


export class BrandBackend extends SingleService<Brand, CreateBrandDto, UpdateBrandDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LBSN_BRAND,
            ),
            new BrandBackendDataGenerator(),
            {
                options: {
                    pk     : 'title',
                    timeout: 100,
                },
            },
        );
    }
}