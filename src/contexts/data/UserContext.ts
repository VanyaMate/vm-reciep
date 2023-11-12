import { User } from '@/modules/api/user/user-service.types.ts';
import { createContext } from 'react';


export type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
    user   : null,
    setUser: () => {
    },
});