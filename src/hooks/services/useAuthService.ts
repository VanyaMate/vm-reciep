import { IAuthService } from '@/modules/api/auth/auth-service.interface.ts';
import { AuthData } from '@/modules/api/auth/auth-service.types.ts';
import { useCallback, useContext, useMemo } from 'react';
import { ServicesContext } from '@/contexts/ServicesContext.tsx';
import { EntitiesContext } from '@/contexts/EntitiesContext.ts';


export const useAuthEntity = function (): IAuthService<AuthData> {
    const services = useContext(ServicesContext);
    const entities = useContext(EntitiesContext);

    const login = useCallback((login: string, password: string, remember: boolean) => {
        return entities.auth.auth(
            () => services!.auth.login(login, password, remember),
        );
    }, [ services, entities ]);

    const registration = useCallback((login: string, password: string, remember: boolean) => {
        return entities.auth.auth(
            () => services!.auth.registration(login, password, remember),
        );
    }, [ services, entities ]);

    const logout = useCallback(() => {
        return services!.auth.logout().then(() => entities.auth.reset()).then(() => true);
    }, [ services, entities ]);

    const refresh = useCallback(() => {
        return entities.auth.auth(
            () => services!.auth.refresh(),
        );
    }, [ services, entities ]);

    return useMemo(() => ({
        login,
        registration,
        logout,
        refresh,
    }), [ login, refresh, login, refresh, entities ]);
};