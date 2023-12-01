import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import PageContent from '@/components/_common/PageContent/PageContent.tsx';
import Header
    from '@/components/_common/_header/Header/Header.tsx';
import Footer from '@/components/_common/_footer/Footer/Footer.tsx';
import HeaderBanner
    from '@/components/_common/_header/HeaderBanner/HeaderBanner.tsx';
import HeaderLogo from '@/components/_common/_header/HeaderLogo/HeaderLogo.tsx';
import HeaderUserContainer
    from '@/containers/_header/HeaderUserContainer/HeaderUserContainer.tsx';
import AuthFormModalContainer
    from '@/containers/AuthFormModal/AuthFormModalContainer.tsx';
import HeaderSearchContainer
    from '@/containers/_header/HeaderSearchContainer/HeaderSearchContainer.tsx';


export type CommonLayoutProps = {
    smallBanner?: boolean;
}

const CommonLayout: React.FC<CommonLayoutProps> = (props) => {
    const { smallBanner } = props;

    return (
        <PageContent
            top={
                <>
                    <Header
                        left={ <HeaderLogo/> }
                        right={
                            <>
                                <AuthFormModalContainer/>
                                <HeaderUserContainer/>
                            </>
                        }
                    />
                    <HeaderBanner
                        background={ 'https://sun9-33.userapi.com/impg/Qlb57eUd9aiK2SZf0ZI8oxBhWDJr8-VDYAv1Iw/zknRT2jtc4s.jpg?size=1024x320&quality=96&sign=254c130e8bc1f2697601714f784db6d1&type=albumalbum' }
                        footer={
                            <HeaderSearchContainer/>
                        }
                        small={ smallBanner }
                    />
                    <Outlet/>
                </>
            }
            footer={
                <Footer/>
            }
        />
    );
};

export default React.memo(CommonLayout);