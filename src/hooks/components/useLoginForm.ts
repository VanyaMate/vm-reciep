import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { useCallback, useState } from 'react';
import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';


export type LoginCallback = (login: string, password: string, remember?: boolean) => Promise<AuthData | void>;

export type UseLoginForm = {
    onSubmit: LoginCallback;
    process: boolean;
    error: string;
}

export type UseLoginFormProps = {
    authService: IAuthService<AuthData>;
    onFinish?: () => void;
}

export const useLoginForm = function (props: UseLoginFormProps): UseLoginForm {
    const { authService, onFinish } = props;
    const [ process, setProcess ]   = useState<boolean>(false);
    const [ error, setError ]       = useState<string>('');
    const onSubmit: LoginCallback   = useCallback((login, password, remember) => {
        setProcess(true);
        setError('');
        return authService
            .login(login, password, remember)
            .then(() => onFinish && onFinish())
            .catch((error) => setError(error))
            .finally(() => setProcess(false));
    }, [ authService, process, error ]);

    return { process, error, onSubmit };
};