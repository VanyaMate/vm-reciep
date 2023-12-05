import { SingleService, StorageService } from '@vanyamate/market-place-service';
import {
    BrandBackendDataGenerator,
} from '@/modules/local-backend/brand/brand-backend.data-generator.ts';
import { LS_NAME__BRAND } from '@/modules/local-backend/storages.ts';
import {
    Brand,
    CreateBrandDto, UpdateBrandDto,
} from '@/modules/api/brand/brand-service.types.ts';


export class BrandBackend extends SingleService<Brand, CreateBrandDto, UpdateBrandDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__BRAND,
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