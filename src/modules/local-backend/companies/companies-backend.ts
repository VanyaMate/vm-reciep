import {
    MultiplyService,
    StorageService,
} from '@vanyamate/market-place-service';
import { Company } from '@/modules/api/company/company-service.types.ts';
import companies
    from '@vanyamate/market-place-service/data/companies/companies_1.json';
import { LS_NAME__COMPANY } from '@/modules/local-backend/storages.ts';


export class CompaniesBackend extends MultiplyService<Company> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__COMPANY,
            ),
            {
                options: {
                    timeout      : 100,
                    findOneFilter: (company, id) => company.title === id,
                    items        : companies,
                },
            },
        );
    }
}