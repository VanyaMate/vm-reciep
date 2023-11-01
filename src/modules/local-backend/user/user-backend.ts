import {
    UserBackendDataGenerator,
} from '@/modules/local-backend/user/user-backend.data-generator.ts';
import {
    CreateUserDto,
    UpdateUserDto,
    User,
} from '@/modules/local-backend/user/user-backend.types.ts';


import { SingleService, StorageService } from '@vanyamate/market-place-service';


export class UserBackend extends SingleService<User, CreateUserDto, UpdateUserDto> {
    constructor () {
        super(
            new StorageService(
                localStorage,
                'users',
            ),
            new UserBackendDataGenerator(),
            {
                options: {
                    pk: 'login',
                },
            },
        );
    }
}