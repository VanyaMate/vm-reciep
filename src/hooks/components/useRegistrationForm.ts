import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { useCallback, useContext, useState } from 'react';
import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';


export type RegistrationCallback = (login: string, password: string, remember?: boolean) => Promise<AuthData | void>;

export type UseRegistrationForm = {
    onSubmit: RegistrationCallback;
    process: boolean;
    error: string;
}

export type UseRegistrationFormProps = {
    authService: IAuthService<AuthData>;
}

export const useRegistrationForm = function (props: UseRegistrationFormProps): UseRegistrationForm {
    const { authService }                = props;
    const [ process, setProcess ]        = useState<boolean>(false);
    const [ error, setError ]            = useState<string>('');
    const onSubmit: RegistrationCallback = useCallback((login, password, remember) => {
        setProcess(true);
        setError('');
        return authService
            .registration(login, password, remember)
            .catch((error) => setError(error))
            .finally(() => setProcess(false));
    }, []);

    return { process, error, onSubmit };
};