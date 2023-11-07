import { createContext } from 'react';


export type AuthContextType = {
    process: boolean;
    setProcess: (process: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    process   : false,
    setProcess: () => {
    },
});