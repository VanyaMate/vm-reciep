import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Checkbox, Form, Input } from 'antd';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import { UseRegistrationForm } from '@/hooks/components/useRegistrationForm.ts';
import css from '../Form.module.scss';


type LayoutType = Parameters<typeof Form>[0]['layout'];

export type RegistrationFormProps = {
    registrationFormController: UseRegistrationForm;
}

export type RegistrationData = {
    login: string;
    password: string;
    remember: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
    const { registrationFormController } = props;
    const [ form ]                       = Form.useForm<RegistrationData>();
    const values                         = Form.useWatch([], form);
    const [ valid, setValid ]            = useState<boolean>(false);

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
                !registrationFormController.process && registrationFormController.error &&
                <Alert
                    message={ 'Ошибка регистрации' }
                    description={ registrationFormController.error }
                    type={ 'error' }
                    closable
                />
            }
            <Form<RegistrationData>
                layout={ 'vertical' }
                form={ form }
                disabled={ registrationFormController.process }
                onFinish={ (data) => registrationFormController.onSubmit(data.login, data.password, data.remember) }
            >
                <Form.Item
                    label={ 'Логин' }
                    name={ 'login' }
                    rules={ [ { required: true, min: 6, max: 24 } ] }
                >
                    <Input placeholder={ 'Введите логин для регистрации' }/>
                </Form.Item>
                <Form.Item
                    label={ 'Пароль' }
                    name={ 'password' }
                    rules={ [ { required: true, min: 6, max: 24 } ] }
                >
                    <Input.Password placeholder={ 'Введите пароль для' +
                        ' регистрации' }/>
                </Form.Item>
                <Form.Item name={ 'remember' } valuePropName={ 'checked' }>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type={ 'submit' }
                            styleType={ 'second' }
                            disabled={ !valid }
                            loading={ registrationFormController.process }
                            onClick={ () => form.submit() }
                            block
                    >Регистрация</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegistrationForm;