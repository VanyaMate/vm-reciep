import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PageContent from '@/components/_common/PageContent/PageContent.tsx';
import Header
    from '@/components/_common/_header/Header/Header.tsx';
import Footer from '@/components/_common/_footer/Footer/Footer.tsx';
import HeaderBanner
    from '@/components/_common/_header/HeaderBanner/HeaderBanner.tsx';
import HeaderSearch
    from '@/components/_common/_header/HeaderSearch/HeaderSearch.tsx';
import { AuthContext } from '@/contexts/AuthContext.ts';
import HeaderLogo from '@/components/_common/_header/HeaderLogo/HeaderLogo.tsx';
import HeaderUser from '@/components/_common/_header/HeaderUser/HeaderUser.tsx';
import { useAuth } from '@/hooks/useAuth.ts';


const CommonLayout = () => {
    const user        = useContext(AuthContext);
    const { process } = useAuth();

    return (
        <PageContent
            top={
                <>
                    <Header
                        left={ <HeaderLogo/> }
                        right={ <HeaderUser process={ process }
                                            user={ user?.user ?? null }
                                            cart={ { items: [], userId: '' } }
                                            wishlist={ {
                                                items : [ 'st', 'ring' ],
                                                userId: '',
                                            } }
                        /> }
                    />
                    <HeaderBanner
                        background={ 'https://images.unsplash.com/photo-1576562331281-d09e46af9854?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D' }
                        footer={ <HeaderSearch/> }
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

export default CommonLayout;