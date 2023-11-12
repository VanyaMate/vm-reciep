import { User } from '@/modules/api/user/user-service.types.ts';
import { createContext } from 'react';


export type UserAuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    process: boolean;
    setProcess: (status: boolean) => void;
}

export const UserAuthContext = createContext<UserAuthContextType | null>(null);