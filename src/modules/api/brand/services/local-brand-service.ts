import { IBrandService } from '@/modules/api/brand/brand-service.interface.ts';
import {
    Brand,
    CreateBrandDto, UpdateBrandDto,
} from '@/modules/api/brand/brand-service.types.ts';
import { ISingleService } from '@vanyamate/market-place-service';


export class LocalBrandService implements IBrandService<Brand, CreateBrandDto, UpdateBrandDto> {
    constructor (
        private readonly _backendService: ISingleService<Brand, CreateBrandDto, UpdateBrandDto>,
    ) {
    }

    create (data: CreateBrandDto): Promise<Brand> {
        return this._backendService.create({
            ...data,
        });
    }

    delete (id: string): Promise<boolean> {
        return this._backendService.delete(id);
    }

    read (id: string): Promise<Brand | null> {
        return this._backendService.read(id);
    }

    update (id: string, data: UpdateBrandDto): Promise<Brand> {
        return this._backendService.update(id, data);
    }
}