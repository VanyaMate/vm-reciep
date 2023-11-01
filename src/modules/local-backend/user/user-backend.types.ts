import { User } from '@/modules/api/user/user-service.types.ts';


export type PrivateUser = User & { password: string };

export type CreateUserDto = Pick<PrivateUser, 'login' | 'password'>;
export type UpdateUserDto = Omit<PrivateUser, 'login'>;