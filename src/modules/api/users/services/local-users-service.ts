import { IUsersService } from '@/modules/api/users/users-service.interface.ts';
import { User } from '@/modules/api/user/user-service.types.ts';
import { IMultiplyService } from '@vanyamate/market-place-service';
import {
    PrivateUser,
} from '@/modules/local-backend/user/user-backend.types.ts';
import { IMapper } from '@/modules/mapper.interface.ts';
import { Filter, Options, MultiplyResponse } from '@/modules/api.types';


export class LocalUsersService implements IUsersService<User> {
    constructor (
        private readonly _usersBackend: IMultiplyService<PrivateUser>,
        private readonly _userMapper: IMapper<PrivateUser, User>,
    ) {
    }

    async findOne (id: string): Promise<User | null> {
        const user: PrivateUser | null = await this._usersBackend.findOne(id);
        if (user) {
            return this._userMapper.convert(user);
        } else {
            return null;
        }
    }

    async findMany (filter: Filter<User>, options: Options<User>): Promise<MultiplyResponse<User>> {
        const response = await (
            (typeof filter === 'function')
            ? this._usersBackend.findManyByFilter(filter, options)
            : this._usersBackend.findMany(filter, options)
        );

        return {
            count  : response.count,
            options: options,
            list   : response.list.map(this._userMapper.convert),
        };
    }
}