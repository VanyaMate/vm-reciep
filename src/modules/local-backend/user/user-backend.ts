import {
    UserBackendDataGenerator,
} from '@/modules/local-backend/user/user-backend.data-generator.ts';
import {
    CreateUserDto, PrivateUser,
    UpdateUserDto,
} from '@/modules/local-backend/user/user-backend.types.ts';


import { SingleService, StorageService } from '@vanyamate/market-place-service';
import { LBSN_USER } from '@/modules/local-backend/storages.ts';


export class UserBackend extends SingleService<PrivateUser, CreateUserDto, UpdateUserDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                LBSN_USER,
            ),
            new UserBackendDataGenerator(),
            {
                options: {
                    pk     : 'login',
                    timeout: 100,
                },
            },
        );
    }
}