import { Filter, MultiplyResponse, Options } from '@/modules/api.types.ts';


export interface IUsersService<User> {
    findOne (id: string): Promise<User | null>;

    findMany (filter: Filter<User>, options: Options<User>): Promise<MultiplyResponse<User>>;
}