import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
    const [footerData, setFooterData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleHashClick = (e, hash) => {
        if (location.pathname === '/') {
            // If already on home page, smooth scroll to the hash section
            e.preventDefault();
            const element = document.querySelector(hash);
            if (element) {
                const navbarHeight = 120; // Approximate navbar height (includes top bar + header)
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
                
                // Update URL hash for shareable link
                window.history.pushState(null, '', hash);
            }
        } else {
            // If on another page, navigate to home with hash (ScrollToTop will handle the scroll)
            e.preventDefault();
            navigate(`/${hash}`);
        }
    };

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const response = await fetch(`${apiUrl}/api/portfolio/footer/`);
                if (response.ok) {
                    const data = await response.json();
                    setFooterData(data);
                }
            } catch (err) {
                console.error('Error fetching footer data:', err);
            }
        };

        fetchFooterData();
    }, []);

    return (
        <footer className="bg-primary text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
                    <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                                <i className={`${footerData?.logo_icon || 'fas fa-stethoscope'} text-lg sm:text-xl text-accent`}></i>
                            </div>
                            <span className="text-base sm:text-lg md:text-xl font-bold">{footerData?.doctor_name || 'Dr. Abul Khayer (Biplob)'}</span>
                        </div>
                        <p className="text-gray-200 mb-5 sm:mb-6 md:mb-8 text-xs sm:text-[13px] md:text-[14px] leading-relaxed">
                            {footerData?.description || 'Dedicated to providing expert anaesthesia, intensive care, pain management, and diabetology services with personalized treatment plans.'}
                        </p>

                        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                            <div className="flex items-start gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                                <i className="fas fa-map-marker-alt mt-0.5 sm:mt-1 text-accent flex-shrink-0"></i>
                                <span className="text-gray-200">{footerData?.address || 'Dhaka, Bangladesh'}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                                <i className="fas fa-phone text-accent flex-shrink-0"></i>
                                <span className="text-gray-200">{footerData?.phone_number || '+8801762037234'}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                                <i className="fas fa-envelope text-accent flex-shrink-0"></i>
                                <span className="text-gray-200">{footerData?.email || 'akbiplob36@gmail.com'}</span>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                                <i className="fas fa-clock mt-0.5 sm:mt-1 text-accent flex-shrink-0"></i>
                                <span className="text-gray-200">{footerData?.working_hours || 'Mon - Fri: 9:00 AM - 6:00 PM'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Footer Sections */}
                    {footerData?.footer_sections && Array.isArray(footerData.footer_sections) && footerData.footer_sections.length > 0 ? (
                        footerData.footer_sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <h3 className="font-bold mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg text-accent">{section.title || 'Section'}</h3>
                                <ul className={`space-y-2 sm:space-y-3 text-xs sm:text-sm ${sectionIndex === footerData.footer_sections.length - 1 ? 'mb-5 sm:mb-6' : ''}`}>
                                    {section.links && Array.isArray(section.links) && section.links.length > 0 ? (
                                        section.links.map((link, linkIndex) => {
                                            const href = typeof link === 'object' ? (link.href || link.url || '#') : '#';
                                            const label = typeof link === 'object' ? (link.label || link.name || '') : link;
                                            const isInternalLink = href && (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#'));
                                            const isHashLink = href && (href.startsWith('/#') || href.startsWith('#'));
                                            
                                            if (isHashLink) {
                                                const hash = href.startsWith('/#') ? href.substring(1) : href;
                                                return (
                                                    <li key={linkIndex}>
                                                        <a href={href} onClick={(e) => handleHashClick(e, hash)} className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">
                                                            {label}
                                                        </a>
                                                    </li>
                                                );
                                            } else if (isInternalLink) {
                                                return (
                                                    <li key={linkIndex}>
                                                        <Link to={href} className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">
                                                            {label}
                                                        </Link>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={linkIndex}>
                                                        <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel={href.startsWith('http') ? 'noopener noreferrer' : ''} className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">
                                                            {label}
                                                        </a>
                                                    </li>
                                                );
                                            }
                                        })
                                    ) : null}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <>
                            {/* Default fallback sections if no dynamic sections */}
                            <div>
                                <h3 className="font-bold mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg text-accent">Quick Links</h3>
                                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                    <li><a href="/#home" onClick={(e) => handleHashClick(e, '#home')} className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Home</a></li>
                                    <li><a href="/#about" onClick={(e) => handleHashClick(e, '#about')} className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">About Doctor</a></li>
                                    <li><a href="/#services" onClick={(e) => handleHashClick(e, '#services')} className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Services</a></li>
                                    <li><a href="/#blog" onClick={(e) => handleHashClick(e, '#blog')} className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Blog</a></li>
                                    <li><a href="/#contact" onClick={(e) => handleHashClick(e, '#contact')} className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg text-accent">Our Services</h3>
                                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                    <li><a href="#" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Anaesthesia</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Intensive Care</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Pain Management</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Diabetology</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Consultation</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg text-accent">Patient Resources</h3>
                                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-5 sm:mb-6">
                                    <li><a href="#" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Educational Videos</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">FAQ</a></li>
                                    <li><a href="#" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Research Papers</a></li>
                                    <li><Link to="/appointment" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Book Appointment</Link></li>
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Social Media Section - Always in last column */}
                    <div>
                        <h3 className="font-bold mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg text-accent">{footerData?.social_media_title || 'Follow Us'}</h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-5 sm:mb-6">
                            {/* Empty space for links if needed */}
                        </ul>
                        <div className="mt-6 sm:mt-8">
                            <div className="flex gap-2 sm:gap-3">
                                {footerData?.facebook_url && (
                                    <a href={footerData.facebook_url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                        <i className="fab fa-facebook-f text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                    </a>
                                )}
                                {footerData?.twitter_url && (
                                    <a href={footerData.twitter_url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                        <i className="fab fa-twitter text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                    </a>
                                )}
                                {footerData?.linkedin_url && (
                                    <a href={footerData.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                        <i className="fab fa-linkedin-in text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                    </a>
                                )}
                                {footerData?.instagram_url && (
                                    <a href={footerData.instagram_url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                        <i className="fab fa-instagram text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                    </a>
                                )}
                                {footerData?.youtube_url && (
                                    <a href={footerData.youtube_url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                        <i className="fab fa-youtube text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                    </a>
                                )}
                                {!footerData?.facebook_url && !footerData?.twitter_url && !footerData?.linkedin_url && !footerData?.instagram_url && !footerData?.youtube_url && (
                                    <>
                                        <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                            <i className="fab fa-facebook-f text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                        </a>
                                        <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                            <i className="fab fa-twitter text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                        </a>
                                        <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                            <i className="fab fa-linkedin-in text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                        </a>
                                        <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-accent backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center transition group">
                                            <i className="fab fa-instagram text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm text-gray-200 text-center md:text-left">
                            {footerData?.copyright_text || 'Copyright © 2025 Dr. Abul Khayer (Biplob). All rights reserved.'}
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-1 text-xs sm:text-sm text-gray-200">
                            <span>Developed by</span>
                            <a 
                                href="https://queio.com/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-secondary hover:text-accent transition-colors"
                            >
                                Queio
                            </a>
                            <span>and Developer</span>
                            <a 
                                href="https://shaznuz.com/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-secondary hover:text-accent transition-colors"
                            >
                                Shaznuz
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
