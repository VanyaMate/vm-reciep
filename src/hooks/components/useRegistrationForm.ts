import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { useCallback, useState } from 'react';
import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';


export type RegistrationCallback = (login: string, password: string, remember?: boolean) => Promise<AuthData | void>;

export type UseRegistrationForm = {
    onSubmit: RegistrationCallback;
    process: boolean;
    error: string;
}

export type UseRegistrationFormProps = {
    authService: IAuthService<AuthData>;
    onFinish?: () => void;
}

export const useRegistrationForm = function (props: UseRegistrationFormProps): UseRegistrationForm {
    const { authService, onFinish }      = props;
    const [ process, setProcess ]        = useState<boolean>(false);
    const [ error, setError ]            = useState<string>('');
    const onSubmit: RegistrationCallback = useCallback((login, password, remember) => {
        setProcess(true);
        setError('');
        return authService
            .registration(login, password, remember)
            .then(() => onFinish && onFinish())
            .catch((error) => setError(error))
            .finally(() => setProcess(false));
    }, [ authService, process, error ]);

    return { process, error, onSubmit };
};