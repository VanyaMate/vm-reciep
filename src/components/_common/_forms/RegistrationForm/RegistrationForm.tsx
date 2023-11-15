import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox, Form, Input } from 'antd';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import { UseRegistrationForm } from '@/hooks/components/useRegistrationForm.ts';


type LayoutType = Parameters<typeof Form>[0]['layout'];

export type RegistrationFormProps = {
    registrationFromController: UseRegistrationForm;
}

export type RegistrationData = {
    login: string;
    password: string;
    remember: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
    const { registrationFromController } = props;
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
        <Form<RegistrationData>
            layout={ 'vertical' }
            form={ form }
            disabled={ registrationFromController.process }
            onFinish={ (data) => registrationFromController.onSubmit(data.login, data.password, data.remember) }
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
                        onClick={ () => form.submit() }>Регистрация</Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;