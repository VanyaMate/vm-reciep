import React, { useContext, useState } from 'react';
import Modal from '@/components/_ui/_container/Modal/Modal.tsx';
import {
    AuthFormModalContext,
} from '@/contexts/components/AuthFormModalContext.tsx';
import RegistrationForm
    from '@/components/_common/_forms/RegistrationForm/RegistrationForm.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import { useRegistrationForm } from '@/hooks/components/useRegistrationForm.ts';
import css from './AuthFormModalContainer.module.scss';
import HeaderLogo from '@/components/_common/_header/HeaderLogo/HeaderLogo.tsx';
import { Segmented } from 'antd';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import LoginForm from '@/components/_common/_forms/LoginForm/LoginForm.tsx';
import { useLoginForm } from '@/hooks/components/useLoginForm.ts';


export type AuthFormType = 'login' | 'registration';

const AuthFormModalContainer = () => {
    const [ authType, setAuthType ]                  = useState<AuthFormType>('login');
    const segmentedOptions: SegmentedLabeledOption[] = [
        {
            label: 'Вход',
            value: 'login',
        },
        {
            label: 'Регистрация',
            value: 'registration',
        },
    ];
    const authFormModalContext                       = useContext(AuthFormModalContext);
    const auth                                       = useAuth();
    const registrationForm                           = useRegistrationForm({
        authService: auth,
        onFinish   : authFormModalContext.close,
    });
    const loginForm                                  = useLoginForm({
        authService: auth,
        onFinish   : authFormModalContext.close,
    });

    return (
        <Modal opened={ authFormModalContext.opened }
               onClose={ authFormModalContext.close }>
            <div className={ css.container }>
                <HeaderLogo/>
                <Segmented
                    style={ { width: '100%' } }
                    options={ segmentedOptions }
                    onChange={ (type) => setAuthType(type as AuthFormType) }
                    block
                />
                {
                    authType === 'login'
                    ? <LoginForm
                        loginFormController={ loginForm }
                    />
                    : <RegistrationForm
                        registrationFormController={ registrationForm }
                    />
                }
            </div>
        </Modal>
    );
};

export default AuthFormModalContainer;