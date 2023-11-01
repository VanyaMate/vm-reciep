import { User } from '@/modules/api/user/user-service.types.ts';
import { PrivateUser } from '@/modules/local-backend/user/user-backend.types.ts';
import { IMapper } from '@/modules/mapper.interface.ts';


export class UserBackendMapper implements IMapper<PrivateUser, User> {
    public convert (data: PrivateUser): User {
        return {
            login : data.login,
            avatar: data.avatar,
        };
    }
}