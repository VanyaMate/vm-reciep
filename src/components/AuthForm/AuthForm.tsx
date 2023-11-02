import React, { useMemo, useState } from 'react';
import css from './AuthForm.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { Field, Formik } from 'formik';


export type AuthFormProps = {
    onLogin: (login: string, password: string, remember: boolean) => Promise<any>;
    onRegistration: (login: string, password: string, remember: boolean) => Promise<any>;
}

const AuthForm: React.FC<AuthFormProps> = (props) => {
    const { onLogin, onRegistration } = props;
    const [ type, setType ]           = useState<'login' | 'registration'>('login');

    const onSubmit = useMemo(() => {
        if (type === 'login') {
            return onLogin;
        } else {
            return onRegistration;
        }
    }, [ type ]);

    return (
        <div className={ css.container }>
            <div className={ css.control }>
                <div
                    onClick={ () => setType('login') }
                    className={ cn(css.item, (type === 'login') && css.active) }>login
                </div>
                <div
                    onClick={ () => setType('registration') }
                    className={ cn(css.item, (type === 'registration') && css.active) }>registration
                </div>
            </div>
            <Formik
                initialValues={ { login: '', password: '', remember: false } }
                onSubmit={ (values) => onSubmit(values.login, values.password, values.remember) }
            >
                {
                    ({
                        values,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={ handleSubmit }>
                            <Field name={ 'login' }/>
                            <Field name={ 'password' } type={ 'password' }/>
                            <label>
                                <Field type={ 'checkbox' } name={ 'remember' }/>
                                remember
                            </label>
                            <button
                                type={ 'submit' }
                            >
                                {
                                    type === 'login'
                                    ? 'login'
                                    : 'registration'
                                }
                            </button>
                        </form>
                    )
                }
            </Formik>
        </div>
    );
};

export default AuthForm;