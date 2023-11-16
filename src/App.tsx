import React, { useEffect } from 'react';
import Pages from '@/pages/pages.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import { useLocation } from 'react-router-dom';


let refreshData: boolean = false;
const App                = () => {
    const { refresh }  = useAuth();
    const { pathname } = useLocation();

    useEffect(() => {
        !refreshData && refresh();
        refreshData = true;
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [ pathname ]);
    /*
     return (
     <DevComponentsBrowser/>
     );*/

    return (
        <Pages/>
    );
};

export default React.memo(App);