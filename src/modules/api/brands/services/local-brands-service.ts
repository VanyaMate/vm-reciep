import {
    IBrandsService,
} from '@/modules/api/brands/brands-service.interface.ts';
import { Brand } from '@/modules/api/brand/brand-service.types.ts';
import { IMultiplyService } from '@vanyamate/market-place-service';
import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';


export class LocalBrandsService implements IBrandsService<Brand> {
    constructor (private readonly _brandsService: IMultiplyService<Brand>) {
    }

    public findMany (filter: Filter<Brand>, options: Options<Brand>): Promise<MultiplyResponse<Brand>> {
        if (typeof filter === 'function') {
            return this._brandsService.findManyByFilter(filter, options);
        } else {
            return this._brandsService.findMany(filter, options);
        }
    }

    public findOne (id: string): Promise<Brand | null> {
        return this._brandsService.findOne(id);
    }

}