import React from 'react';
import DevComponentsList from '@/_dev_/DevComponentsList/DevComponentsList.tsx';
import DevComponentsProductCard
    from '@/_dev_/_component-list_/DevComponentsProductCard.tsx';
import DevComponentsButton
    from '@/_dev_/_component-list_/DevComponentsButton.tsx';


const DevComponentsBrowser = () => {
    return (
        <DevComponentsList>
            <DevComponentsButton/>
            <DevComponentsProductCard/>
        </DevComponentsList>
    );
};

export default React.memo(DevComponentsBrowser);