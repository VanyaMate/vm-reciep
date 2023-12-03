import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';


export interface ICompaniesService<Company> {
    findOne (id: string): Promise<Company | null>;

    findMany (filter: Filter<Company>, options: Options<Company>): Promise<MultiplyResponse<Company>>;
}