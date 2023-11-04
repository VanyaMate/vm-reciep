import { Entity, IEntity, EntityEvents } from '@vanyamate/lgc';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';


export type AuthEvents<AuthData> = EntityEvents<{
    auth: AuthData | null;
}>;

export interface IAuthEntity extends IEntity<AuthEvents<AuthData>> {
    auth (callback: () => Promise<AuthData>): Promise<AuthData | null>;

    reset (): Promise<void>;
}

export class AuthEntity extends Entity<AuthEvents<AuthData>> implements IAuthEntity {
    private _data: AuthData | null = null;

    constructor () {
        super();
        this._executeInit();
    }

    public async auth (callback: () => Promise<AuthData>): Promise<AuthData> {
        return this
            ._executeWithProcess('auth', async () => callback().then((data) => this._data = data))
            .then(() => this._data as AuthData);
    }

    public async reset (): Promise<void> {
        return this._executeWithProcess('auth', async () => this._data = null);
    }
}