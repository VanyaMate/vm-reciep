import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { useCallback, useContext, useMemo, useState } from 'react';
import { ServicesContext } from '@/contexts/ServicesContext.tsx';
import { AuthContext } from '@/contexts/AuthContext.ts';


export const useAuth = function (): IAuthService<AuthData> & {
    process: boolean
} {
    const services = useContext(ServicesContext);
    const auth     = useContext(AuthContext);

    const login = useCallback((login: string, password: string, remember: boolean) => {
        auth!.setProcess(true);
        return services!.auth
            .login(login, password, remember)
            .then((authData) => {
                auth!.setUser(authData.user);
                return authData;
            })
            .finally(() => auth!.setProcess(false));
    }, [ services, auth ]);

    const registration = useCallback((login: string, password: string, remember: boolean) => {
        auth!.setProcess(true);
        return services!.auth
            .registration(login, password, remember)
            .then((authData) => {
                auth!.setUser(authData.user);
                return authData;
            })
            .finally(() => auth!.setProcess(false));
    }, [ services, auth ]);

    const logout = useCallback(() => {
        auth!.setProcess(true);
        return services!.auth
            .logout()
            .then(() => auth!.setUser(null))
            .then(() => true)
            .finally(() => auth!.setProcess(false));
    }, [ services, auth ]);

    const refresh = useCallback(() => {
        auth!.setProcess(true);
        return services!.auth
            .refresh()
            .then((authData) => {
                auth!.setUser(authData.user);
                return authData;
            })
            .finally(() => auth!.setProcess(false));
    }, [ services, auth ]);

    return useMemo(() => ({
        login,
        registration,
        logout,
        refresh,
        process: auth!.process,
    }), [ login, refresh, login, refresh, auth ]);
};