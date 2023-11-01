export type User = {
    login: string;
    password: string;
    avatar: string;
}

export type PublicUser = Omit<User, 'password'>;

export type CreateUserDto = Pick<User, 'login' | 'password'>;
export type UpdateUserDto = Omit<User, 'login'>;