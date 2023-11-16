import React, { useCallback, useState } from 'react';
import { AuthFormModalContext } from '@/contexts/components/AuthFormModalContext.tsx';


const AuthFormModalProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const { children }            = props;
    const [ opened, setOpened ]   = useState<boolean>(false);
    const open                    = useCallback(() => setOpened(true), [ setOpened ]);
    const close                   = useCallback(() => setOpened(false), [ setOpened ]);

    return (
        <AuthFormModalContext.Provider value={ {
            opened, open, close
        } }>
            { children }
        </AuthFormModalContext.Provider>
    );
};

export default AuthFormModalProvider;