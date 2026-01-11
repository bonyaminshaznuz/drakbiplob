import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Function to scroll to hash element
            const scrollToHash = () => {
                const element = document.querySelector(hash);
                if (element) {
                    // Get navbar height for offset (sticky navbar)
                    const navbarHeight = 100; // Approximate navbar height
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    return true; // Element found and scrolled
                }
                return false; // Element not found
            };

            // Try to scroll immediately
            if (!scrollToHash()) {
                // If element not found, retry with increasing delays
                // This handles cases where the page is still loading
                let retries = 0;
                const maxRetries = 10;
                const retryInterval = 100;

                const retryScroll = setInterval(() => {
                    retries++;
                    if (scrollToHash() || retries >= maxRetries) {
                        clearInterval(retryScroll);
                    }
                }, retryInterval);
            }
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
