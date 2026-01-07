import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // If there's a hash, scroll to that element after a small delay
            // Delay is needed to ensure the page has loaded
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // No hash, scroll to top
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
