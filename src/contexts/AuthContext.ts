import { User } from '@/modules/api/user/user-service.types.ts';
import { createContext } from 'react';


export type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    process: boolean;
    setProcess: (status: boolean) => void;
}

export const AuthContext = createContext<UserContextType | null>(null);