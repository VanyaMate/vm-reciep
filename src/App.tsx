import React, { useEffect } from 'react';
import Pages from '@/pages/pages.tsx';
import { useAuthEntity } from '@/hooks/services/useAuthService.ts';
import { useAuth } from '@/hooks/useAuth.ts';


let refreshData: boolean = false;
const App                = () => {
    const { refresh } = useAuth();

    useEffect(() => {
        !refreshData && refresh();
        refreshData = true;
    }, []);

    return (
        <Pages/>
    );
};

export default React.memo(App);