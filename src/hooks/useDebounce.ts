import { useEffect } from 'react';


export const useDebounce = function (callback: () => any, delay: number) {
    useEffect(() => {
        if (delay) {
            const timeout = setTimeout(() => {
                callback();
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            callback();
        }
    }, [ callback, delay ]);
};