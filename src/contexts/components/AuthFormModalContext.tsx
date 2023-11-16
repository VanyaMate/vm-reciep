import React, { createContext } from 'react';


export type AuthFormModalContext = {
    opened: boolean;
    open: () => void;
    close: () => void;
}

export const AuthFormModalContext = createContext<AuthFormModalContext>({
    opened: false,
    open  : () => {
    },
    close : () => {
    },
});