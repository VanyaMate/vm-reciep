import { IMultiplyService } from '@vanyamate/market-place-service';
import { Company } from '@/modules/api/company/company-service.types.ts';
import {
    ICompaniesService,
} from '@/modules/api/companies/companies-service.interface.ts';
import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';


export class LocalCompaniesService implements ICompaniesService<Company> {
    constructor (private readonly _companiesBackend: IMultiplyService<Company>) {
    }

    findMany (filter: Filter<Company>, options: Options<Company>): Promise<MultiplyResponse<Company>> {
        if (typeof filter === 'function') {
            return this._companiesBackend.findManyByFilter(filter, options);
        } else {
            return this._companiesBackend.findMany(filter, options);
        }
    }

    findOne (id: string): Promise<Company | null> {
        return this._companiesBackend.findOne(id);
    }


}