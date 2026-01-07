import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
                                <i className="fas fa-stethoscope text-lg sm:text-xl text-accent"></i>
                            </div>
                            <span className="text-base sm:text-lg md:text-xl font-bold">Dr. Abul Khayer (Biplob)</span>
                        </div>
                        <p className="text-gray-200 mb-5 sm:mb-6 md:mb-8 text-xs sm:text-[13px] md:text-[14px] leading-relaxed">
                            Dedicated to providing expert anaesthesia, intensive care, pain management, and diabetology
                            services with personalized treatment plans.
                        </p>

                        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                            <div className="flex items-start gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                                <i className="fas fa-map-marker-alt mt-0.5 sm:mt-1 text-accent flex-shrink-0"></i>
                                <span className="text-gray-200">Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                                <i className="fas fa-phone text-accent flex-shrink-0"></i>
                                <span className="text-gray-200">+880 1712-345678</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                                <i className="fas fa-envelope text-accent flex-shrink-0"></i>
                                <span className="text-gray-200">akbiplob36@gmail.com</span>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                                <i className="fas fa-clock mt-0.5 sm:mt-1 text-accent flex-shrink-0"></i>
                                <span className="text-gray-200">Mon - Fri: 9:00 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg text-accent">Quick Links</h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <li><Link to="/" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Home</Link></li>
                            <li><a href="/#about" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">About Doctor</a></li>
                            <li><a href="/#services" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Services</a></li>
                            <li><a href="/#blog" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Blog</a></li>
                            <li><a href="/#contact" className="text-gray-200 hover:text-accent transition hover:translate-x-1 inline-block">Contact</a></li>
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

                        <div className="mt-6 sm:mt-8">
                            <h4 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm">Follow Us</h4>
                            <div className="flex gap-2 sm:gap-3">
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm text-gray-200 text-center md:text-left">
                            Copyright © 2025 Dr. Abul Khayer (Biplob). All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
                            <a href="#" className="text-gray-200 hover:text-accent transition">Privacy Policy</a>
                            <a href="#" className="text-gray-200 hover:text-accent transition">Terms of Service</a>
                            <a href="#" className="text-gray-200 hover:text-accent transition">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
