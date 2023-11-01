import { CreateUserDto, User } from '@/modules/local-backend/user/user-backend.types.ts';
import { IDataGenerator } from '@vanyamate/market-place-service';


export class UserBackendDataGenerator implements IDataGenerator<User, CreateUserDto> {
    private readonly _clearData: User = {
        avatar  : '',
        password: '',
        login   : '',
    };

    public avatar (): User['avatar'] {
        return 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png';
    }

    public byData (data: CreateUserDto): User {
        return {
            ...this._clearData,
            ...data,
        };
    }

    public clear (): User {
        return { ...this._clearData };
    }

    public filled (data: CreateUserDto | undefined): User {
        return {
            avatar  : this.avatar(),
            login   : this.login(),
            password: this.password(),
            ...data,
        };
    }

    public login (): User['login'] {
        return '';
    }

    public password (): User['password'] {
        return '';
    }

}