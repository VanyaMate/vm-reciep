export interface IAuthService<AuthDataType> {
    login (login: string, password: string, remember?: boolean): Promise<AuthDataType>;

    registration (login: string, password: string, remember?: boolean): Promise<AuthDataType>;

    refresh (): Promise<AuthDataType>;

    logout (): Promise<boolean>;
}