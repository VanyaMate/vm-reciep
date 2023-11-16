import { useContext } from 'react';
import {
    AuthFormModalContext,
} from '@/contexts/components/AuthFormModalContext.tsx';


export const useAuthModal = function () {
    const modalContext: AuthFormModalContext = useContext(AuthFormModalContext);
};