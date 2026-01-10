import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navbarData, setNavbarData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchNavbarData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const response = await fetch(`${apiUrl}/api/portfolio/navbar/`);
                if (response.ok) {
                    const data = await response.json();
                    setNavbarData(data);
                }
            } catch (err) {
                console.error('Error fetching navbar data:', err);
            }
        };

        fetchNavbarData();
    }, []);

    const handleHomeClick = (e) => {
        if (location.pathname === '/') {
            // If already on home page, scroll to top
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // If on another page, navigate to home (ScrollToTop will handle the scroll)
            navigate('/');
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Top Contact Bar */}
            <div className="bg-primary text-white py-2 sm:py-3 text-xs sm:text-sm shadow-sm">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 md:gap-8">
                        <div className="flex items-center gap-2 hover:text-accent transition">
                            <i className="fas fa-phone text-xs"></i>
                            <span className="font-medium">{navbarData?.phone_number || '+8801762037234'}</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-accent transition">
                            <i className="fas fa-envelope text-xs"></i>
                            <span className="font-medium hidden sm:inline">{navbarData?.email || 'akbiplob36@gmail.com'}</span>
                            <span className="font-medium sm:hidden">Email Us</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 ml-auto">
                            <i className="fas fa-clock text-xs"></i>
                            <span className="font-medium">{navbarData?.working_hours || 'Mon - Fri: 9:00 AM - 6:00 PM'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header/Navigation */}
            <header className="bg-white/95 shadow-md sticky top-0 z-50 backdrop-blur-lg">
                <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
                            <div
                                className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <i className={`${navbarData?.logo_icon || 'fas fa-stethoscope'} text-lg sm:text-xl text-white`}></i>
                            </div>
                            <div>
                                <span className="text-base sm:text-xl font-bold text-primary block">{navbarData?.doctor_name || 'Dr. Abul Khayer (Biplob)'}</span>
                                <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">{navbarData?.doctor_title || 'Anaesthetist, Intensivist & Pain Physician'}</span>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-1">
                            {navbarData?.menu_items && Array.isArray(navbarData.menu_items) && navbarData.menu_items.length > 0 ? (
                                navbarData.menu_items.map((item, index) => (
                                    item.href && item.href.startsWith('/') ? (
                                        <Link key={index} to={item.href} onClick={item.href === '/' ? handleHomeClick : undefined} className="text-gray-700 hover:text-primary transition px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cream">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <a key={index} href={item.href || '#'} className="text-gray-700 hover:text-primary transition px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cream">
                                            {item.label}
                                        </a>
                                    )
                                ))
                            ) : (
                                <>
                                    <Link to="/" onClick={handleHomeClick} className="text-gray-700 hover:text-primary transition px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cream">Home</Link>
                                    <a href="/#about" className="text-gray-700 hover:text-primary transition px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cream">About</a>
                                    <a href="/#services" className="text-gray-700 hover:text-primary transition px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cream">Services</a>
                                    <a href="/#blog" className="text-gray-700 hover:text-primary transition px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cream">Blog</a>
                                    <a href="/#contact" className="text-gray-700 hover:text-primary transition px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cream">Contact</a>
                                </>
                            )}
                            <Link to="/appointment" className="bg-gradient-to-r from-secondary to-accent text-white px-5 xl:px-7 py-2.5 xl:py-3 rounded-full text-sm font-bold ml-2 xl:ml-4 shadow-lg">
                                <i className={`${navbarData?.appointment_button_icon || 'fas fa-calendar-check'} mr-2`}></i>
                                {navbarData?.appointment_button_text || 'Book Appointment'}
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            id="mobileMenuBtn"
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-cream transition cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl text-primary`}></i>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        id="mobileMenu"
                        className={`${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} lg:hidden overflow-hidden transition-all duration-300 ease-in-out`}
                    >
                        <nav className="flex flex-col space-y-2 pt-4 border-t border-gray-200 mt-2">
                            {navbarData?.menu_items && Array.isArray(navbarData.menu_items) && navbarData.menu_items.length > 0 ? (
                                navbarData.menu_items.map((item, index) => (
                                    item.href && item.href.startsWith('/') ? (
                                        <Link key={index} to={item.href} onClick={item.href === '/' ? handleHomeClick : () => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition px-4 py-3 rounded-lg text-sm font-semibold hover:bg-cream block">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <a key={index} href={item.href || '#'} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition px-4 py-3 rounded-lg text-sm font-semibold hover:bg-cream block">
                                            {item.label}
                                        </a>
                                    )
                                ))
                            ) : (
                                <>
                                    <Link to="/" onClick={handleHomeClick} className="text-gray-700 hover:text-primary transition px-4 py-3 rounded-lg text-sm font-semibold hover:bg-cream block">Home</Link>
                                    <a href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition px-4 py-3 rounded-lg text-sm font-semibold hover:bg-cream block">About</a>
                                    <a href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition px-4 py-3 rounded-lg text-sm font-semibold hover:bg-cream block">Services</a>
                                    <a href="/#blog" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition px-4 py-3 rounded-lg text-sm font-semibold hover:bg-cream block">Blog</a>
                                    <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition px-4 py-3 rounded-lg text-sm font-semibold hover:bg-cream block">Contact</a>
                                </>
                            )}
                            <Link to="/appointment" onClick={() => setIsMobileMenuOpen(false)} className="bg-gradient-to-r from-secondary to-accent text-white px-5 py-3 rounded-full text-sm font-bold shadow-lg w-full mt-2 inline-block text-center hover:from-accent hover:to-secondary">
                                <i className={`${navbarData?.appointment_button_icon || 'fas fa-calendar-check'} mr-2`}></i>
                                {navbarData?.appointment_button_text || 'Book Appointment'}
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
