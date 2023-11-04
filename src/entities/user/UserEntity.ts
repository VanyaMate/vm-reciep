import { Entity, EntityEvents, IEntity } from '@vanyamate/lgc';
import { User } from '@/modules/api/user/user-service.types.ts';


export type UserEvents = EntityEvents<{
    set: User | null;
}>;

export interface IUserEntity extends IEntity<UserEvents> {
    set (user: User | null): void;
}

export class UserEntity extends Entity<UserEvents> implements IUserEntity {
    private _user: User | null = null;

    set (user: User | null): void {
        this._executeWithProcess('set', async () => this._user = user);
    }
}