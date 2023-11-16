import React, { useEffect } from 'react';
import Pages from '@/pages/pages.tsx';
import { useAuthEntity } from '@/hooks/services/useAuthService.ts';
import { useAuth } from '@/hooks/useAuth.ts';
import DevComponentsBrowser from '@/_dev_/DevComponentsBrowser.tsx';


let refreshData: boolean = false;
const App                = () => {
    const { refresh } = useAuth();

    useEffect(() => {
        !refreshData && refresh();
        refreshData = true;
    }, []);
/*
    return (
        <DevComponentsBrowser/>
    );*/

    return (
        <Pages/>
    );
};

export default React.memo(App);