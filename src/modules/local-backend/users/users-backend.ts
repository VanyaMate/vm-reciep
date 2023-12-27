import {
    MultiplyService,
    StorageService,
} from '@vanyamate/market-place-service';
import {
    PrivateUser,
} from '@/modules/local-backend/user/user-backend.types.ts';
import { LS_NAME__USER } from '@/modules/local-backend/storages.ts';


export class UsersBackend extends MultiplyService<PrivateUser> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LS_NAME__USER,
            ),
            {
                options: {
                    maxOperationsPerStep: 100,
                    timeout             : 200,
                    findOneFilter       : (user, id) => user.login === id,
                },
            },
        );
    }
}