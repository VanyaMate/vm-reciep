import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import { User } from '@/modules/api/user/user-service.types.ts';
import {
    CreateCartDto,
    UpdateCartDto,
} from '@/modules/local-backend/cart/cart-backend.types.ts';
import {
    CreateUserDto, PrivateUser,
    UpdateUserDto,
} from '@/modules/local-backend/user/user-backend.types.ts';
import { IMapper } from '@/modules/mapper.interface.ts';
import { SingleService, IStorageService } from '@vanyamate/market-place-service';


export class LocalAuthService implements IAuthService<AuthData> {
    constructor (
        private readonly _userService: SingleService<PrivateUser, CreateUserDto, UpdateUserDto>,
        private readonly _userMapper: IMapper<PrivateUser, User>,
        private readonly _cartService: SingleService<Cart, CreateCartDto, UpdateCartDto>,
        private readonly _storageService: IStorageService<string>,
        private readonly _temporallyStorageService: IStorageService<string>,
    ) {

    }

    public async login (login: string, password: string, remember?: boolean): Promise<AuthData> {
        const user: PrivateUser | null = await this._userService.read(login);
        if (user && user.password === password) {
            this._remember(user.login, remember);
            return this._getAuthData(user);
        } else {
            throw 'Не правильный логин или пароль';
        }
    }

    public async logout (): Promise<boolean> {
        this._storageService.set([]);
        this._temporallyStorageService.set([]);
        return true;
    }

    public async refresh (): Promise<AuthData> {
        const savedLogin: string = this._temporallyStorageService.get()[0] ?? this._storageService.get()[0];
        if (savedLogin) {
            const user: PrivateUser | null = await this._userService.read(savedLogin);
            if (user) {
                return this._getAuthData(user);
            }
        }

        throw 'Такого пользователя не существует';
    }

    public async registration (login: string, password: string, remember?: boolean): Promise<AuthData> {
        const createdUser: PrivateUser | null = await this._userService.read(login);
        if (!createdUser) {
            const user: PrivateUser = await this._userService.create({ login, password });
            this._remember(user.login, remember);
            return this._getAuthData(user);
        } else {
            throw 'Пользователь с таким login уже существует';
        }
    }

    private async _getAuthData (user: PrivateUser): Promise<AuthData> {
        const cart: Cart = await this._getCart(user.login);

        return {
            user: this._userMapper.convert(user),
            cart: cart.items,
        };
    }

    private async _getCart (userId: string): Promise<Cart> {
        let cart: Cart | null = await this._cartService.read(userId);
        if (!cart) {
            cart = await this._cartService.create({ userId });
        }
        return cart;
    }

    private _remember (login: string, state?: boolean) {
        if (state) {
            this._storageService.set([ login ]);
        } else {
            this._temporallyStorageService.set([ login ]);
        }
    }
}