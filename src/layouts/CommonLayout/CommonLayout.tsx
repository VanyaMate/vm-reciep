import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import PageContent from '@/components/_common/PageContent/PageContent.tsx';
import Header
    from '@/components/_common/_header/Header/Header.tsx';
import Footer from '@/components/_common/_footer/Footer/Footer.tsx';
import HeaderBanner
    from '@/components/_common/_header/HeaderBanner/HeaderBanner.tsx';
import HeaderSearch
    from '@/components/_common/_header/HeaderSearch/HeaderSearch.tsx';
import HeaderLogo from '@/components/_common/_header/HeaderLogo/HeaderLogo.tsx';
import HeaderUserContainer
    from '@/containers/_header/HeaderUserContainer/HeaderUserContainer.tsx';
import AuthFormModalContainer
    from '@/containers/AuthFormModal/AuthFormModalContainer.tsx';
import { SearchContext } from '@/contexts/data/SearchContext.ts';
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
                        background={ 'https://images.unsplash.com/photo-1576562331281-d09e46af9854?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D' }
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