import React, { useEffect, useState } from 'react';
import Pages from '@/pages/pages.tsx';
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