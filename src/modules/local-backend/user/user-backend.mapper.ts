import { PublicUser, User } from '@/modules/local-backend/user/user-backend.types.ts';
import { IMapper } from '@/modules/mapper.interface.ts';


export class UserBackendMapper implements IMapper<User, PublicUser> {
    public convert (data: User): PublicUser {
        return {
            login : data.login,
            avatar: data.avatar,
        };
    }
}