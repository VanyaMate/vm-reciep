import { CreateUserDto, PrivateUser } from '@/modules/local-backend/user/user-backend.types.ts';
import { IDataGenerator } from '@vanyamate/market-place-service';


export class UserBackendDataGenerator implements IDataGenerator<PrivateUser, CreateUserDto> {
    private readonly _clearData: PrivateUser = {
        avatar  : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
        password: '',
        login   : '',
    };

    public avatar (): PrivateUser['avatar'] {
        return 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png';
    }

    public byData (data: CreateUserDto): PrivateUser {
        return {
            ...this._clearData,
            ...data,
        };
    }

    public clear (): PrivateUser {
        return { ...this._clearData };
    }

    public filled (data: CreateUserDto | undefined): PrivateUser {
        return {
            avatar  : this.avatar(),
            login   : this.login(),
            password: this.password(),
            ...data,
        };
    }

    public login (): PrivateUser['login'] {
        return '';
    }

    public password (): PrivateUser['password'] {
        return '';
    }

}