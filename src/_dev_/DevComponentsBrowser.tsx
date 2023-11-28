import React from 'react';
import DevComponentsList from '@/_dev_/DevComponentsList/DevComponentsList.tsx';
import DevComponentsProductCard
    from '@/_dev_/_component-list_/DevComponentsProductCard.tsx';
import DevComponentsButton
    from '@/_dev_/_component-list_/DevComponentsButton.tsx';
import DevComponentsDropdown
    from '@/_dev_/_component-list_/DevComponentsDropdown.tsx';
import DevComponentsForm from '@/_dev_/_component-list_/DevComponentsForm.tsx';
import DevComponentsCartItems
    from '@/_dev_/_component-list_/DevComponentsCartItems.tsx';
import DevComponentsCartList
    from '@/_dev_/_component-list_/DevComponentsCartList.tsx';


const DevComponentsBrowser = () => {
    return (
        <DevComponentsList>
            <DevComponentsCartList/>
            <DevComponentsCartItems/>
            <DevComponentsForm/>
            <DevComponentsDropdown/>
            <DevComponentsButton/>
            <DevComponentsProductCard/>
        </DevComponentsList>
    );
};

export default React.memo(DevComponentsBrowser);