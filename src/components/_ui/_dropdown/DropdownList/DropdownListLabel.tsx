import React, { useContext } from 'react';
import {
    DropdownListContext,
} from '@/components/_ui/_dropdown/DropdownList/DropdownListContext.ts';


const DropdownListLabel = () => {
    return useContext(DropdownListContext);
};

export default DropdownListLabel;