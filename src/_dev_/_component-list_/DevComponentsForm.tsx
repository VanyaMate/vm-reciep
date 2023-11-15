import React, { useContext } from 'react';
import DevComponentsItem from '@/_dev_/DevComponentsItem/DevComponentsItem.tsx';
import RegistrationForm
    from '@/components/_common/_forms/RegistrationForm/RegistrationForm.tsx';
import { useRegistrationForm } from '@/hooks/components/useRegistrationForm.ts';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';


const DevComponentsForm = () => {
    const { auth }                   = useContext(ServicesContext);
    const registrationFormController = useRegistrationForm({ authService: auth });

    return (
        <DevComponentsItem label={ 'Forms' } type={ 'col' }>
            <RegistrationForm
                registrationFromController={ registrationFormController }/>
        </DevComponentsItem>
    );
};

export default DevComponentsForm;