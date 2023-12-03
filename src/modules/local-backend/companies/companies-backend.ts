import {
    MultiplyService,
    StorageService,
} from '@vanyamate/market-place-service';
import { Company } from '@/modules/api/company/company-service.types.ts';
import { LBSN_COMPANY } from '@/modules/local-backend/storages.ts';
import companies
    from '@vanyamate/market-place-service/data/companies/companies_1.json';


export class CompaniesBackend extends MultiplyService<Company> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LBSN_COMPANY,
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