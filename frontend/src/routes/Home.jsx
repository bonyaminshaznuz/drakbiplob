import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-softcream">
                {/* Hero Section - Redesigned & Optimized */}
                <section className="relative overflow-hidden bg-primary text-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 flex items-center min-h-[600px]">

                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[80px] animate-pulse"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[80px]"></div>
                        <div className="absolute top-[20%] right-[10%] w-16 h-16 bg-secondary/20 rounded-full blur-[30px] animate-bounce duration-[3000ms]"></div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-20">

                            {/* Left Content Area */}
                            <div className="w-full md:w-1/2 text-center md:text-left z-20 mt-8 md:mt-0">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg mb-4 sm:mb-6 hover:bg-white/20 transition-all cursor-default group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-accent/90 group-hover:text-accent transition-colors">Top Rated Specialist</span>
                                </div>

                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 font-sans tracking-tight">
                                    Your Health, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cream">
                                        Our Priority
                                    </span>
                                </h1>

                                <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-light">
                                    Expert care in <span className="text-white font-medium">Anaesthesiology</span>, <span className="text-white font-medium">ICU</span>, and <span className="text-white font-medium">Pain Management</span>.
                                    Dedicated to providing compassionate tailored medical services.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center md:justify-start">
                                    <Link to="/appointment" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-secondary text-white rounded-full text-sm sm:text-base font-bold shadow-[0_4px_14px_rgba(232,130,94,0.4)] hover:shadow-[0_6px_20px_rgba(232,130,94,0.6)] transition-all transform hover:-translate-y-0.5 text-center group">
                                        <i className="fas fa-calendar-check mr-2 group-hover:rotate-12 transition-transform"></i>
                                        Book Appointment
                                    </Link>
                                    <button className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-sm sm:text-base font-bold transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                                        <div className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                            <i className="fas fa-play text-[10px] ml-0.5"></i>
                                        </div>
                                        Watch Video
                                    </button>
                                </div>

                                {/* Modern Stats */}
                                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-0.5">12+</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wide">Years Exp.</p>
                                    </div>
                                    <div className="text-center md:text-left border-l border-white/10 pl-2 sm:pl-4 md:pl-0 md:border-none">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-0.5">5k+</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wide">Patients</p>
                                    </div>
                                    <div className="text-center md:text-left border-l border-white/10 pl-2 sm:pl-4 md:pl-0 md:border-none">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-0.5">24/7</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wide">Emergency</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Image Area */}
                            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10 px-4 md:px-0">
                                <div className="relative w-full max-w-sm aspect-[4/5] md:aspect-square lg:aspect-[4/5] mx-auto md:mx-0">
                                    {/* Abstract Fancy Background Shapes */}
                                    <div className="absolute top-6 right-6 w-full h-full bg-primary/20 rounded-3xl -rotate-6 backdrop-blur-sm border border-white/10"></div>
                                    <div className="absolute bottom-6 left-6 w-full h-full bg-primary/20 rounded-3xl rotate-3 backdrop-blur-sm border border-white/10"></div>

                                    {/* Main Image Container */}
                                    <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-primary/30 backdrop-blur-sm group">
                                        <img
                                            src="/images/pp.jpg"
                                            alt="Dr. Abul Khayer"
                                            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                                        />

                                        {/* Overlay Gradient at bottom */}
                                        <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent"></div>

                                        {/* Name Tag on Image */}
                                        <div className="absolute bottom-5 left-5 right-5 text-white">
                                            <h3 className="text-lg sm:text-xl font-bold leading-tight">Dr. Abul Khayer</h3>
                                            <p className="text-accent text-xs sm:text-sm font-medium mt-1">Anaesthetist & Pain Physician</p>
                                        </div>
                                    </div>

                                    {/* Floating Stats Card */}
                                    <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xl p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white/50 animate-bounce duration-[4000ms]">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <i className="fas fa-star text-base"></i>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xl font-bold text-gray-800">4.9</span>
                                                    <i className="fas fa-star text-yellow-400 text-[10px]"></i>
                                                </div>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Rating</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Element 2 */}
                                    <div className="absolute top-6 -left-2 sm:-left-4 bg-white/95 backdrop-blur-xl py-2 px-4 rounded-full shadow-lg border border-white/50 flex items-center gap-2 animate-pulse duration-[3000ms]">
                                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full box-shadow-green"></span>
                                        <span className="text-xs font-bold text-primary">Available Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Cards (white strip under hero) */}
                <section className="py-8 sm:py-10 md:py-12 bg-softcream relative">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 bg-white shadow-large rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-10 py-8 sm:py-10 -mt-16 sm:-mt-20 md:-mt-24 relative z-20 border border-gray-100">
                            <div className="text-center px-4 group transition-all duration-500 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <i className="fas fa-syringe text-white text-2xl"></i>
                                </div>
                                <h3 className="text-[16px] font-bold mb-3 text-primary">Anaesthesia Services</h3>
                                <p className="text-gray-600 text-[13px] leading-relaxed">
                                    Expert anaesthesia care for all surgical procedures with safety and patient comfort as top priority.
                                </p>
                            </div>

                            <div className="text-center px-4 group transition-all duration-500 hover:-translate-y-2 border-x border-gray-100">
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <i className="fas fa-heartbeat text-white text-2xl"></i>
                                </div>
                                <h3 className="text-[16px] font-bold mb-3 text-primary">Intensive Care</h3>
                                <p className="text-gray-600 text-[13px] leading-relaxed">
                                    24/7 critical care management with advanced monitoring and treatment for critically ill patients.
                                </p>
                            </div>

                            <div className="text-center px-4 group transition-all duration-500 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <i className="fas fa-hand-holding-medical text-white text-2xl"></i>
                                </div>
                                <h3 className="text-[16px] font-bold mb-3 text-primary">Pain Management</h3>
                                <p className="text-gray-600 text-[13px] leading-relaxed">
                                    Comprehensive pain relief solutions using latest techniques for chronic and acute pain conditions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Professional Summary (second block) */}
                <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-cream relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl"></div>
                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
                            <div className="relative group mb-8 lg:mb-0">
                                <div className="hidden sm:block absolute -left-3 sm:-left-6 top-6 bottom-6 w-2 sm:w-3 bg-gradient-to-b from-secondary to-accent rounded-full"></div>
                                <div className="absolute -inset-2 sm:-inset-4 bg-primary rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <img src="/images/cover.jpg" alt="Doctor with patient" className="relative rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto object-cover border-2 sm:border-4 border-white" />
                                {/* Floating Element */}
                                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-secondary to-accent rounded-lg sm:rounded-xl flex items-center justify-center">
                                            <i className="fas fa-award text-white text-base sm:text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary text-sm sm:text-base md:text-lg">Certified</p>
                                            <p className="text-[10px] sm:text-xs text-gray-500">Excellence</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="inline-block mb-3 sm:mb-4">
                                    <span className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider bg-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">About Me</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 md:mb-6 leading-tight">
                                    Professional <span className="text-primary">Summary</span>
                                </h2>
                                <p className="text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-sm sm:text-[15px]">
                                    I am Dr. Abul Khayer (Biplob), an MD in Anaesthesiology with over <strong className="text-primary">2 years of experience</strong> in providing expert anaesthesia, intensive care, and pain management services.
                                    My approach combines advanced medical techniques with compassionate patient care, ensuring optimal outcomes and comfort for every patient.
                                </p>
                                <p className="text-gray-600 mb-6 sm:mb-7 md:mb-8 leading-relaxed text-sm sm:text-[15px]">
                                    With certifications in Intensive Care Medicine (ICU), Diabetology, and specialized training from Dhaka Medical College,
                                    I am committed to delivering comprehensive healthcare services using evidence-based practices and the latest medical advancements.
                                </p>

                                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 p-4 sm:p-5 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-soft">
                                    <div className="border-r border-gray-200">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                                                <i className="fas fa-user-injured text-primary text-sm sm:text-base"></i>
                                            </div>
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">50+</div>
                                        </div>
                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                            Successfully managed anaesthesia and critical care for thousands of patients.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                                                <i className="fas fa-procedures text-secondary text-sm sm:text-base"></i>
                                            </div>
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">2+</div>
                                        </div>
                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                            Years of expertise in anaesthesiology, ICU management, and pain treatment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experienced in Multiple Medical Practices */}
                <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                        <div className="inline-block mb-3 sm:mb-4">
                            <span className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider bg-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">Our Services</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 leading-tight">
                            Experienced in Multiple <span className="text-primary">Medical Specialties</span>
                        </h2>
                        <p className="text-gray-600 mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto text-sm sm:text-[15px] leading-relaxed px-4">
                            With extensive training and expertise in anaesthesia, intensive care, pain management, and diabetology,
                            I provide comprehensive, patient-centered medical care using the latest evidence-based practices.
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                            <div className="bg-gradient-to-br from-white to-cream p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-primary rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <i className="fas fa-syringe text-white text-xl sm:text-2xl"></i>
                                </div>
                                <h3 className="text-base sm:text-[17px] font-bold mb-3 sm:mb-4 min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center text-primary px-2">
                                    General Anaesthesia
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-[13px] mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                                    Safe and effective anaesthesia for all types of surgical procedures with continuous monitoring.
                                </p>
                                <a href="#" className="text-primary hover:text-secondary font-bold text-xs sm:text-sm inline-flex items-center group-hover:gap-3 gap-2 transition-all">
                                    Learn More
                                    <i className="fas fa-arrow-right text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform"></i>
                                </a>
                            </div>

                            <div className="bg-gradient-to-br from-white to-cream p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-primary rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <i className="fas fa-heartbeat text-white text-xl sm:text-2xl"></i>
                                </div>
                                <h3 className="text-base sm:text-[17px] font-bold mb-3 sm:mb-4 min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center text-primary px-2">
                                    ICU Management
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-[13px] mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                                    24/7 critical care with advanced life support systems for critically ill patients.
                                </p>
                                <a href="#" className="text-primary hover:text-secondary font-bold text-xs sm:text-sm inline-flex items-center group-hover:gap-3 gap-2 transition-all">
                                    Learn More
                                    <i className="fas fa-arrow-right text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform"></i>
                                </a>
                            </div>

                            <div className="bg-gradient-to-br from-white to-cream p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-primary rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <i className="fas fa-hand-holding-medical text-white text-xl sm:text-2xl"></i>
                                </div>
                                <h3 className="text-base sm:text-[17px] font-bold mb-3 sm:mb-4 min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center text-primary px-2">
                                    Pain Management
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-[13px] mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                                    Comprehensive chronic and acute pain treatment using advanced interventional techniques.
                                </p>
                                <a href="#" className="text-primary hover:text-secondary font-bold text-xs sm:text-sm inline-flex items-center group-hover:gap-3 gap-2 transition-all">
                                    Learn More
                                    <i className="fas fa-arrow-right text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform"></i>
                                </a>
                            </div>

                            <div className="bg-gradient-to-br from-white to-cream p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-primary rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <i className="fas fa-heartbeat text-white text-xl sm:text-2xl"></i>
                                </div>
                                <h3 className="text-base sm:text-[17px] font-bold mb-3 sm:mb-4 min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center text-primary px-2">
                                    Diabetology Services
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-[13px] mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                                    Expert diabetes management and care with personalized treatment plans for optimal control.
                                </p>
                                <a href="#" className="text-primary hover:text-secondary font-bold text-xs sm:text-sm inline-flex items-center group-hover:gap-3 gap-2 transition-all">
                                    Learn More
                                    <i className="fas fa-arrow-right text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Watch: My Promise to You */}
                <section id="blog" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-softcream relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/5 rounded-full blur-3xl"></div>
                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="inline-block mb-3 sm:mb-4">
                                <span
                                    className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider bg-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">Educational
                                    Videos</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 leading-tight">
                                Watch: My Promise to <span
                                    className="text-primary">You</span>
                            </h2>
                        </div>
                        <div className="flex justify-center space-x-2 sm:space-x-3 mb-10 sm:mb-12 md:mb-16">
                            <button
                                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary/20 hover:border-primary rounded-full hover:bg-primary hover:text-white flex items-center justify-center transition group">
                                <i className="fas fa-chevron-left text-sm sm:text-base text-primary group-hover:text-white"></i>
                            </button>
                            <button
                                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary/20 hover:border-primary rounded-full hover:bg-primary hover:text-white flex items-center justify-center transition group">
                                <i className="fas fa-chevron-right text-sm sm:text-base text-primary group-hover:text-white"></i>
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                            <div
                                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop"
                                        alt="Video thumbnail"
                                        className="w-full h-44 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <i className="fas fa-play text-primary text-base sm:text-lg md:text-xl ml-0.5 sm:ml-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-5 md:p-7">
                                    <h3
                                        className="font-bold mb-2 sm:mb-3 text-sm sm:text-[15px] md:text-[16px] leading-snug text-primary group-hover:text-secondary transition text-left">
                                        Understand Early Invasive Cancer: Early Detection Can & Will Save Lives</h3>
                                    <p className="text-gray-600 text-xs sm:text-[13px] mb-3 sm:mb-4 md:mb-5 leading-relaxed text-left">
                                        Early detection is crucial in cancer treatment. Learn about the signs and screening methods.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="flex items-center gap-1.5 sm:gap-2 bg-primary hover:bg-secondary shadow-lg hover:shadow-xl transition-all duration-300 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold">
                                            <i className="fas fa-play text-[10px] sm:text-xs"></i>
                                            <span>Play</span>
                                        </button>
                                        <span
                                            className="text-gray-500 text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5">
                                            <i className="far fa-clock text-secondary"></i> 05 MINS
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=250&fit=crop"
                                        alt="Video thumbnail"
                                        className="w-full h-44 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <i className="fas fa-play text-primary text-base sm:text-lg md:text-xl ml-0.5 sm:ml-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-5 md:p-7">
                                    <h3
                                        className="font-bold mb-2 sm:mb-3 text-sm sm:text-[15px] md:text-[16px] leading-snug text-primary group-hover:text-secondary transition text-left">
                                        Common Side Effects Cancer: Facts, Symptoms Care & What</h3>
                                    <p className="text-gray-600 text-xs sm:text-[13px] mb-3 sm:mb-4 md:mb-5 leading-relaxed text-left">
                                        Understanding side effects and how to manage them during cancer treatment.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="flex items-center gap-1.5 sm:gap-2 bg-primary hover:bg-secondary shadow-lg hover:shadow-xl transition-all duration-300 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold">
                                            <i className="fas fa-play text-[10px] sm:text-xs"></i>
                                            <span>Play</span>
                                        </button>
                                        <span className="text-gray-500 text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5">
                                            <i className="far fa-clock text-secondary"></i> 08 MINS
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop"
                                        alt="Video thumbnail"
                                        className="w-full h-44 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <i className="fas fa-play text-primary text-base sm:text-lg md:text-xl ml-0.5 sm:ml-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-5 md:p-7">
                                    <h3
                                        className="font-bold mb-2 sm:mb-3 text-sm sm:text-[15px] md:text-[16px] leading-snug text-primary group-hover:text-secondary transition text-left">
                                        Understand Early Invasive Cancer: Facts, Symptoms Care & Support</h3>
                                    <p className="text-gray-600 text-xs sm:text-[13px] mb-3 sm:mb-4 md:mb-5 leading-relaxed text-left">
                                        Comprehensive guide to understanding invasive cancer and available support systems.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="flex items-center gap-1.5 sm:gap-2 bg-primary hover:bg-secondary shadow-lg hover:shadow-xl transition-all duration-300 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold">
                                            <i className="fas fa-play text-[10px] sm:text-xs"></i>
                                            <span>Play</span>
                                        </button>
                                        <span className="text-gray-500 text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5">
                                            <i className="far fa-clock text-secondary"></i> 06 MINS
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-8 sm:mt-10 md:mt-12">
                            <button
                                className="bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-full text-xs sm:text-sm font-bold inline-flex items-center group">
                                <span>Show All Videos</span>
                                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Specialized Cancer Treatment */}
                <section
                    className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-cream via-white to-softcream relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-80 sm:h-80 bg-secondary/5 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-8 sm:mb-10 md:mb-14">
                            <div className="inline-block mb-3 sm:mb-4">
                                <span
                                    className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-secondary/10 to-accent/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-secondary/20 shadow-sm">
                                    ✦ Specialized Care
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight px-4">
                                Specialized <span
                                    className="text-primary">Medical
                                    Services</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
                                Delivering evidence-based treatment with compassion and clinical excellence.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-7 max-w-6xl mx-auto">
                            {/* Card 1 */}
                            <div
                                className="bg-gradient-to-br from-white to-cream rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-primary/10 hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 hover:-translate-y-1">
                                <div
                                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                    <i className="fas fa-syringe text-white text-2xl sm:text-3xl"></i>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3
                                        className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-secondary transition-colors">
                                        Surgical Anaesthesia</h3>
                                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-4">
                                        Safe anaesthesia management for all surgical procedures with patient safety priority.
                                    </p>
                                    <Link to="#"
                                        className="text-primary text-sm sm:text-base font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-secondary">
                                        Learn More <i
                                            className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div
                                className="bg-gradient-to-br from-white to-cream rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-secondary/10 hover:border-secondary/30 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 hover:-translate-y-1">
                                <div
                                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                    <i className="fas fa-heartbeat text-white text-2xl sm:text-3xl"></i>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3
                                        className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-secondary transition-colors">
                                        Critical Care</h3>
                                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-4">
                                        24/7 intensive care unit management for critically ill patients with advanced monitoring.
                                    </p>
                                    <Link to="#"
                                        className="text-secondary text-sm sm:text-base font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-accent">
                                        Learn More <i
                                            className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div
                                className="bg-gradient-to-br from-white to-cream rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                                <div
                                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                    <i className="fas fa-hand-holding-medical text-white text-2xl sm:text-3xl"></i>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3
                                        className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">
                                        Pain Relief</h3>
                                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-4">
                                        Advanced pain management techniques for chronic and acute pain conditions.
                                    </p>
                                    <Link to="#"
                                        className="text-purple-600 text-sm sm:text-base font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-pink-500">
                                        Learn More <i
                                            className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div
                                className="bg-gradient-to-br from-white to-cream rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-indigo-100 hover:border-indigo-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                                <div
                                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                    <i className="fas fa-heartbeat text-white text-2xl sm:text-3xl"></i>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3
                                        className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors">
                                        Diabetes Care</h3>
                                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-4">
                                        Comprehensive diabetes management with personalized treatment plans.
                                    </p>
                                    <Link to="#"
                                        className="text-indigo-600 text-sm sm:text-base font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-blue-500">
                                        Learn More <i
                                            className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section with Appointment (bottom teal band) */}
                <section id="contact"
                    className="py-12 sm:py-16 md:py-20 lg:py-24 bg-primary text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl">
                        </div>
                        <div
                            className="absolute bottom-5 sm:bottom-10 right-10 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent rounded-full blur-3xl">
                        </div>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="inline-block mb-4 sm:mb-5 md:mb-6">
                                    <span
                                        className="text-accent font-bold text-xs sm:text-sm uppercase tracking-wider bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">Book
                                        Now</span>
                                </div>
                                <h2
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 md:mb-6 leading-tight text-left">
                                    Schedule a Virtual or<br />In-Personal <span className="text-accent">Appointment</span> Today
                                </h2>
                                <p className="mb-6 sm:mb-7 md:mb-8 text-white/90 text-sm sm:text-[15px] leading-relaxed max-w-lg text-left">
                                    Take the first step towards better health. Book a consultation with Dr. Abul Khayer (Biplob) and
                                    receive
                                    personalized, expert care tailored to your unique needs. Virtual and in-person appointments
                                    available.
                                </p>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div
                                            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <i className="fas fa-video text-accent text-sm sm:text-base"></i>
                                        </div>
                                        <span className="font-semibold text-sm sm:text-base">Virtual Consultations</span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div
                                            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <i className="fas fa-hospital text-accent text-sm sm:text-base"></i>
                                        </div>
                                        <span className="font-semibold text-sm sm:text-base">In-Person Visits</span>
                                    </div>
                                </div>
                                <Link to="/appointment"
                                    className="bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-xs sm:text-sm font-bold inline-flex items-center group">
                                    <i
                                        className="fas fa-calendar-check mr-2 group-hover:scale-110 transition-transform text-sm sm:text-base"></i>
                                    <span>Book an Appointment</span>
                                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                            </div>
                            <div className="order-1 lg:order-2 relative group">
                                <div
                                    className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl blur-xl group-hover:bg-white/20 transition-colors">
                                </div>
                                <img src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&h=400&fit=crop"
                                    alt="Doctor consultation"
                                    className="relative rounded-3xl shadow-large w-full h-auto object-cover border-4 border-white/20" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Research & Publications */}
                <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-cream relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="text-center mb-6 sm:mb-8 md:mb-10">
                            <div className="inline-block mb-3 sm:mb-4">
                                <span
                                    className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider bg-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">Research</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 leading-tight px-4">
                                Research, Publications & <span
                                    className="text-primary">Paper
                                    Presented</span>
                            </h2>
                        </div>
                        <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16 flex-wrap px-4">
                            <button className="text-white bg-primary font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm shadow-soft">All
                                Research</button>
                            <button
                                className="text-gray-600 hover:text-primary font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm hover:bg-white transition">Publications</button>
                            <button
                                className="text-gray-600 hover:text-primary font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm hover:bg-white transition">Papers</button>
                        </div>

                        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
                            <div
                                className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div
                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-file-medical text-white text-sm sm:text-base"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-primary text-sm sm:text-[15px] mb-1 sm:mb-2 group-hover:text-secondary transition text-left">
                                            To study anthropological in diagnostic cancer in a tertiary cancer institute
                                        </h3>
                                        <p className="text-gray-500 text-xs sm:text-sm text-left">Published in Journal of Oncology, 2024</p>
                                    </div>
                                    <i
                                        className="fas fa-arrow-right text-primary opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"></i>
                                </div>
                            </div>
                            <div
                                className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div
                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-file-medical text-white text-sm sm:text-base"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-primary text-sm sm:text-[15px] mb-1 sm:mb-2 group-hover:text-secondary transition text-left">
                                            To determine the rate of successful cervical cancer in women at a tertiary care
                                            institute
                                        </h3>
                                        <p className="text-gray-500 text-xs sm:text-sm text-left">Published in Women's Health Journal, 2023</p>
                                    </div>
                                    <i
                                        className="fas fa-arrow-right text-primary opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"></i>
                                </div>
                            </div>
                            <div
                                className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div
                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-file-medical text-white text-sm sm:text-base"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-primary text-sm sm:text-[15px] mb-1 sm:mb-2 group-hover:text-secondary transition text-left">
                                            To study the characteristic of genotoxicity after chemotherapy
                                        </h3>
                                        <p className="text-gray-500 text-xs sm:text-sm text-left">Published in Cancer Research, 2023</p>
                                    </div>
                                    <i
                                        className="fas fa-arrow-right text-primary opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"></i>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
                            <button
                                className="bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-full text-xs sm:text-sm font-bold inline-flex items-center group">
                                <span>View More Research</span>
                                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl"></div>
                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="inline-block mb-3 sm:mb-4">
                                <span
                                    className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider bg-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">Testimonials</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3 leading-tight">
                                What Our Patients Say<br className="hidden sm:block" />
                                About <span className="text-primary">Dr.
                                    Abul Khayer</span>
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-[15px] max-w-2xl mx-auto px-4">
                                Real stories from real patients who received compassionate, expert care.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10 md:mt-14">
                            <div
                                className="bg-gradient-to-br from-cream to-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="flex mb-5">
                                    <i className="fas fa-star text-yellow-400 text-lg"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                </div>
                                <div className="mb-4 text-4xl text-primary/10">“</div>
                                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-primary text-left">The Best Doctor Ever!</h3>
                                <p className="text-gray-600 mb-6 sm:mb-8 text-[13px] sm:text-[14px] leading-relaxed text-left">
                                    Dr. Biplob is not only knowledgeable but also incredibly compassionate. He took the time to
                                    explain
                                    everything to me and made me feel comfortable throughout my treatment.
                                </p>
                                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                    <img src="https://i.pravatar.cc/50?img=1" alt="Patient"
                                        className="w-14 h-14 rounded-full border-3 border-primary/20" />
                                    <div className="text-left">
                                        <p className="font-bold text-[15px] text-primary">Karim Ahmed</p>
                                        <p className="text-xs text-gray-500">Surgical Patient</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-gradient-to-br from-cream to-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="flex mb-5">
                                    <i className="fas fa-star text-yellow-400 text-lg"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                </div>
                                <div className="mb-4 text-4xl text-primary/10">“</div>
                                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-primary text-left">Exceptional Care!</h3>
                                <p className="text-gray-600 mb-6 sm:mb-8 text-[13px] sm:text-[14px] leading-relaxed text-left">
                                    I cannot thank Dr. Biplob enough for his expertise and care. He guided me through a very
                                    difficult
                                    time with patience and professionalism.
                                </p>
                                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                    <img src="https://i.pravatar.cc/50?img=5" alt="Patient"
                                        className="w-14 h-14 rounded-full border-3 border-primary/20" />
                                    <div className="text-left">
                                        <p className="font-bold text-[15px] text-primary">Fatema Rahman</p>
                                        <p className="text-xs text-gray-500">ICU Patient</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-gradient-to-br from-cream to-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                <div className="flex mb-5">
                                    <i className="fas fa-star text-yellow-400 text-lg"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                    <i className="fas fa-star text-yellow-400 text-lg ml-1"></i>
                                </div>
                                <div className="mb-4 text-4xl text-primary/10">“</div>
                                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-primary text-left">Truly Holistic!</h3>
                                <p className="text-gray-600 mb-6 sm:mb-8 text-[13px] sm:text-[14px] leading-relaxed text-left">
                                    Dr. Biplob's approach to treatment is holistic and personalized. He truly cares about his
                                    patients
                                    and their well-being beyond just treating the condition.
                                </p>
                                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                    <img src="https://i.pravatar.cc/50?img=9" alt="Patient"
                                        className="w-14 h-14 rounded-full border-3 border-primary/20" />
                                    <div className="text-left">
                                        <p className="font-bold text-[15px] text-primary">Nadia Haque</p>
                                        <p className="text-xs text-gray-500">Pain Management Patient</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    );
};

export default Home;
