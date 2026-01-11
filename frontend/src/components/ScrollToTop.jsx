import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Function to scroll to hash element
        const scrollToHash = () => {
            if (!hash) return false;
            
            const element = document.querySelector(hash);
            if (element) {
                // Get navbar height for offset (sticky navbar)
                const navbarHeight = 120; // Approximate navbar height (includes top bar + header)
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
                return true; // Element found and scrolled
            }
            return false; // Element not found
        };

        if (hash) {
            // Small delay to ensure DOM is ready (especially for direct URL access)
            const timeoutId = setTimeout(() => {
                // Try to scroll immediately
                if (!scrollToHash()) {
                    // If element not found, retry with increasing delays
                    // This handles cases where the page is still loading
                    let retries = 0;
                    const maxRetries = 15; // Increased retries for better reliability
                    const retryInterval = 150;

                    const retryScroll = setInterval(() => {
                        retries++;
                        if (scrollToHash() || retries >= maxRetries) {
                            clearInterval(retryScroll);
                        }
                    }, retryInterval);
                }
            }, 100);

            return () => clearTimeout(timeoutId);
        } else {
            // No hash, scroll to top only on route change (not on every render)
            if (pathname !== '/') {
                // Only scroll to top when navigating to a different route without hash
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'instant'
                });
            }
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
