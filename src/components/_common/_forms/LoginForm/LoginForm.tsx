import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Checkbox, Form, Input } from 'antd';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import { UseRegistrationForm } from '@/hooks/components/useRegistrationForm.ts';
import css from '../Form.module.scss';
import { UseLoginForm } from '@/hooks/components/useLoginForm.ts';


type LayoutType = Parameters<typeof Form>[0]['layout'];

export type LoginFormProps = {
    loginFormController: UseLoginForm;
}

export type LoginData = {
    login: string;
    password: string;
    remember: boolean;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { loginFormController } = props;
    const [ form ]                = Form.useForm<LoginData>();
    const values                  = Form.useWatch([], form);
    const [ valid, setValid ]     = useState<boolean>(false);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(
                () => setValid(true),
                () => setValid(false),
            );
    }, [ values ]);

    return (
        <div className={ css.container }>
            {
                !loginFormController.process && loginFormController.error &&
                <Alert
                    message={ 'Ошибка входа' }
                    description={ loginFormController.error }
                    type={ 'error' }
                    closable
                />
            }
            <Form<LoginData>
                layout={ 'vertical' }
                form={ form }
                disabled={ loginFormController.process }
                onFinish={ (data) => loginFormController.onSubmit(data.login, data.password, data.remember) }
            >
                <Form.Item
                    label={ 'Логин' }
                    name={ 'login' }
                    rules={ [ { required: true, min: 6, max: 24 } ] }
                >
                    <Input placeholder={ 'Введите логин для входа' }/>
                </Form.Item>
                <Form.Item
                    label={ 'Пароль' }
                    name={ 'password' }
                    rules={ [ { required: true, min: 6, max: 24 } ] }
                >
                    <Input.Password placeholder={ 'Введите пароль для' +
                        ' входа' }/>
                </Form.Item>
                <Form.Item name={ 'remember' } valuePropName={ 'checked' }>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type={ 'submit' }
                            styleType={ 'second' }
                            disabled={ !valid }
                            loading={ loginFormController.process }
                            onClick={ () => form.submit() }
                            block
                    >Войти</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;