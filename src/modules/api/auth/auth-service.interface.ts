export interface IAuthService<UserType> {
    login (login: string, password: string, remember?: boolean): Promise<UserType>;

    registration (login: string, password: string, remember?: boolean): Promise<UserType>;

    refresh (): Promise<UserType>;

    logout (): Promise<boolean>;
}