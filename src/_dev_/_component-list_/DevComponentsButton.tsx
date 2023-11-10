import React, { useCallback, useState } from 'react';
import DevComponentsItem from '@/_dev_/DevComponentsItem/DevComponentsItem.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';


const DevComponentsButton = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const onClick                 = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <DevComponentsItem
            label={ 'Buttons' }
            type={ 'col' }
        >
            <Button>Default</Button>
            <Button styleType={ 'primary' } loading={ loading }>Primary</Button>
            <Button styleType={ 'second' } amount={ 10 }>Second</Button>
            <Button styleType={ 'danger' } amount={ 0 }>Danger</Button>
            <Button styleType={ 'main' }>Main</Button>
            <Button styleType={ 'primary' }
                    square
                    amount={ 10 }
                    loading={ loading }> </Button>
            <Button styleType={ 'second' } square> </Button>
            <Button styleType={ 'second' } square skeleton> </Button>
            <Button styleType={ 'second' } skeleton>Добавить в корзину</Button>
            <Button styleType={ 'second' } loading>Добавить в корзину</Button>
            <Button styleType={ 'second' } loading={ loading }
                    onClick={ onClick }>Добавить в корзину</Button>
        </DevComponentsItem>
    );
};

export default DevComponentsButton;