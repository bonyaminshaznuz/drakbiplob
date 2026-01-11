import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    const [portfolioData, setPortfolioData] = useState({
        hero: {},
        services: [],
        featured_services: [],
        services_section: {},
        about: {},
        videos: [],
        testimonials: [],
        research: [],
        contact: {},
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                // #region agent log
                fetch('http://127.0.0.1:7243/ingest/505ac12e-e307-46cb-96d7-8736582c9d0f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.jsx:23',message:'Fetching portfolio data',data:{apiUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                // #endregion
                const response = await fetch(`${apiUrl}/api/portfolio/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch portfolio data');
                }
                const data = await response.json();
                // #region agent log
                fetch('http://127.0.0.1:7243/ingest/505ac12e-e307-46cb-96d7-8736582c9d0f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.jsx:30',message:'Portfolio data received',data:{hero_image:data.hero?.image,about_image:data.about?.image,contact_image_url:data.contact?.image_url,has_hero:!!data.hero,has_about:!!data.about},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                // #endregion
                setPortfolioData(data);
            } catch (err) {
                console.error('Error fetching portfolio data:', err);
                // #region agent log
                fetch('http://127.0.0.1:7243/ingest/505ac12e-e307-46cb-96d7-8736582c9d0f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.jsx:34',message:'Error fetching portfolio data',data:{error:err.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                // #endregion
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-softcream flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const { hero, services, featured_services, services_section, about, videos, testimonials, research, contact } = portfolioData;

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
                                {hero.badge_text && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg mb-4 sm:mb-6 hover:bg-white/20 transition-all cursor-default group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                        <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-accent/90 group-hover:text-accent transition-colors">{hero.badge_text}</span>
                                    </div>
                                )}

                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 font-sans tracking-tight">
                                    {hero.title_line1 || 'Your Health,'} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cream">
                                        {hero.title_line2 || 'Our Priority'}
                                    </span>
                                </h1>

                                <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-light">
                                    {hero.description || 'Expert care in Anaesthesiology, ICU, and Pain Management. Dedicated to providing compassionate tailored medical services.'}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center md:justify-start">
                                    <Link to="/appointment" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-secondary text-white rounded-full text-sm sm:text-base font-bold shadow-[0_4px_14px_rgba(232,130,94,0.4)] hover:shadow-[0_6px_20px_rgba(232,130,94,0.6)] transition-all transform hover:-translate-y-0.5 text-center group">
                                        <i className="fas fa-calendar-check mr-2 group-hover:rotate-12 transition-transform"></i>
                                        Book Appointment
                                    </Link>
                                    {hero.video_url && (
                                        <a href={hero.video_url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-sm sm:text-base font-bold transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                                            <div className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                                <i className="fas fa-play text-[10px] ml-0.5"></i>
                                            </div>
                                            Watch Video
                                        </a>
                                    )}
                                </div>

                                {/* Modern Stats */}
                                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-0.5">{hero.years_experience || '12+'}</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wide">Years Exp.</p>
                                    </div>
                                    <div className="text-center md:text-left border-l border-white/10 pl-2 sm:pl-4 md:pl-0 md:border-none">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-0.5">{hero.patients_count || '5k+'}</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wide">Patients</p>
                                    </div>
                                    <div className="text-center md:text-left border-l border-white/10 pl-2 sm:pl-4 md:pl-0 md:border-none">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-0.5">{hero.emergency_availability || '24/7'}</h3>
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
                                            src={hero.image || "/images/pp.jpg"}
                                            alt={hero.image_alt || "Dr. Abul Khayer"}
                                            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                                            onLoad={() => {
                                                // #region agent log
                                                fetch('http://127.0.0.1:7243/ingest/505ac12e-e307-46cb-96d7-8736582c9d0f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.jsx:137',message:'Hero image loaded successfully',data:{src:hero.image||'/images/pp.jpg'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                                                // #endregion
                                            }}
                                            onError={(e) => {
                                                // #region agent log
                                                fetch('http://127.0.0.1:7243/ingest/505ac12e-e307-46cb-96d7-8736582c9d0f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.jsx:141',message:'Hero image failed to load',data:{failed_src:e.target.src,fallback_to:'/images/pp.jpg'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                                                // #endregion
                                                e.target.src = "/images/pp.jpg";
                                            }}
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
                                                    <span className="text-xl font-bold text-gray-800">{hero.rating || '4.9'}</span>
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
                            {featured_services && featured_services.length > 0 ? (
                                featured_services.map((service, index) => (
                                    <div key={service.id || index} className={`text-center px-4 group transition-all duration-500 hover:-translate-y-2 ${index === 1 && featured_services.length === 3 ? 'border-x border-gray-100' : ''}`}>
                                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <i className={`${service.icon || 'fas fa-syringe'} text-white text-2xl`}></i>
                                        </div>
                                        <h3 className="text-[16px] font-bold mb-3 text-primary">{service.title}</h3>
                                        <p className="text-gray-600 text-[13px] leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                // Fallback services
                                <>
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
                                </>
                            )}
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
                                <img 
                                    src={about.image || "/images/cover.jpg"} 
                                    alt={about.image_alt || "Doctor with patient"} 
                                    className="relative rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto object-cover border-2 sm:border-4 border-white"
                                    onError={(e) => {
                                        e.target.src = "/images/cover.jpg";
                                    }}
                                />
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
                                {about.badge_text && (
                                    <div className="inline-block mb-3 sm:mb-4">
                                        <span className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider bg-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">{about.badge_text}</span>
                                    </div>
                                )}
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 md:mb-6 leading-tight">
                                    {about.title || 'Professional'} <span className="text-primary">{about.title ? about.title.split(' ').slice(1).join(' ') : 'Summary'}</span>
                                </h2>
                                {about.description_paragraph1 && (
                                    <p className="text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-sm sm:text-[15px]">
                                        {about.description_paragraph1}
                                    </p>
                                )}
                                {about.description_paragraph2 && (
                                    <p className="text-gray-600 mb-6 sm:mb-7 md:mb-8 leading-relaxed text-sm sm:text-[15px]">
                                        {about.description_paragraph2}
                                    </p>
                                )}

                                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 p-4 sm:p-5 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-soft">
                                    <div className="border-r border-gray-200">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                                                <i className="fas fa-user-injured text-primary text-sm sm:text-base"></i>
                                            </div>
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">{about.patients_managed || '50+'}</div>
                                        </div>
                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                            {about.patients_managed_description || 'Successfully managed anaesthesia and critical care for thousands of patients.'}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                                                <i className="fas fa-procedures text-secondary text-sm sm:text-base"></i>
                                            </div>
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">{about.years_experience_detail || '2+'}</div>
                                        </div>
                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                            {about.years_experience_description || 'Years of expertise in anaesthesiology, ICU management, and pain treatment.'}
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
                            {services && services.length > 0 ? (
                                services.slice(0, 4).map((service) => (
                                    <div key={service.id} className="bg-gradient-to-br from-white to-cream p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                        <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-primary rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <i className={`${service.icon || 'fas fa-syringe'} text-white text-xl sm:text-2xl`}></i>
                                        </div>
                                        <h3 className="text-base sm:text-[17px] font-bold mb-3 sm:mb-4 min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center text-primary px-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs sm:text-[13px] mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                                            {service.description}
                                        </p>
                                        {(service.link || service.link !== '') && (
                                            <a href={service.link || '#'} className="text-primary hover:text-secondary font-bold text-xs sm:text-sm inline-flex items-center group-hover:gap-3 gap-2 transition-all">
                                                Learn More
                                                <i className="fas fa-arrow-right text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform"></i>
                                            </a>
                                        )}
                                    </div>
                                ))
                            ) : (
                                // Fallback services
                                <>
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
                                </>
                            )}
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
                            {videos && videos.length > 0 ? (
                                videos.slice(0, 3).map((video) => (
                                    <div key={video.id} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                        <div className="relative overflow-hidden">
                                            <img 
                                                src={video.thumbnail_url || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop"}
                                                alt={video.title || "Video thumbnail"}
                                                className="w-full h-44 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <a href={video.video_url || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <i className="fas fa-play text-primary text-base sm:text-lg md:text-xl ml-0.5 sm:ml-1"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="p-4 sm:p-5 md:p-7">
                                            <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-[15px] md:text-[16px] leading-snug text-primary group-hover:text-secondary transition text-left">
                                                {video.title}
                                            </h3>
                                            <p className="text-gray-600 text-xs sm:text-[13px] mb-3 sm:mb-4 md:mb-5 leading-relaxed text-left">
                                                {video.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <a href={video.video_url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 sm:gap-2 bg-primary hover:bg-secondary shadow-lg hover:shadow-xl transition-all duration-300 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold">
                                                    <i className="fas fa-play text-[10px] sm:text-xs"></i>
                                                    <span>Play</span>
                                                </a>
                                                <span className="text-gray-500 text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5">
                                                    <i className="far fa-clock text-secondary"></i> {video.duration || '05 MINS'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500 py-8">No videos available at the moment.</div>
                            )}
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
                            {services_section?.badge_text && (
                                <div className="inline-block mb-3 sm:mb-4">
                                    <span
                                        className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-secondary/10 to-accent/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-secondary/20 shadow-sm">
                                        {services_section.badge_text}
                                    </span>
                                </div>
                            )}
                            {services_section?.title && (
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight px-4">
                                    {services_section.title.includes('Specialized Medical Services') ? (
                                        <>
                                            Specialized <span className="text-primary">Medical Services</span>
                                        </>
                                    ) : (
                                        services_section.title
                                    )}
                                </h2>
                            )}
                            {services_section?.description && (
                                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
                                    {services_section.description}
                                </p>
                            )}
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
                                    {contact.title ? (
                                        <>
                                            {contact.title.split(/(\bAppointment\b)/).map((part, i) => 
                                                part.toLowerCase() === 'appointment' ? (
                                                    <span key={i} className="text-accent">{part}</span>
                                                ) : part === 'Appointment' ? (
                                                    <span key={i} className="text-accent">{part}</span>
                                                ) : (
                                                    <span key={i}>{part}</span>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            Schedule a Virtual or<br />In-Personal <span className="text-accent">Appointment</span> Today
                                        </>
                                    )}
                                </h2>
                                <p className="mb-6 sm:mb-7 md:mb-8 text-white/90 text-sm sm:text-[15px] leading-relaxed max-w-lg text-left">
                                    {contact.description || 'Take the first step towards better health. Book a consultation with Dr. Abul Khayer (Biplob) and receive personalized, expert care tailored to your unique needs. Virtual and in-person appointments available.'}
                                </p>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                                    {contact.show_virtual_consultations && (
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div
                                                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <i className="fas fa-video text-accent text-sm sm:text-base"></i>
                                            </div>
                                            <span className="font-semibold text-sm sm:text-base">Virtual Consultations</span>
                                        </div>
                                    )}
                                    {contact.show_in_person_visits && (
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div
                                                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <i className="fas fa-hospital text-accent text-sm sm:text-base"></i>
                                            </div>
                                            <span className="font-semibold text-sm sm:text-base">In-Person Visits</span>
                                        </div>
                                    )}
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
                                <img 
                                    src={contact.image_url || "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&h=400&fit=crop"}
                                    alt={contact.image_alt || "Doctor consultation"}
                                    className="relative rounded-3xl shadow-large w-full h-auto object-cover border-4 border-white/20"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&h=400&fit=crop";
                                    }}
                                />
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
                            {research && research.length > 0 ? (
                                research.map((item) => (
                                    <div key={item.id} className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div
                                                className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                                <i className="fas fa-file-medical text-white text-sm sm:text-base"></i>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-primary text-sm sm:text-[15px] mb-1 sm:mb-2 group-hover:text-secondary transition text-left">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-500 text-xs sm:text-sm text-left">{item.publication_info}</p>
                                            </div>
                                            <i
                                                className="fas fa-arrow-right text-primary opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"></i>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-8">No research publications available at the moment.</div>
                            )}
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
                            {testimonials && testimonials.length > 0 ? (
                                testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="bg-gradient-to-br from-cream to-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                                        <div className="flex mb-5">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fas fa-star text-${i < testimonial.rating ? 'yellow-400' : 'gray-300'} text-lg ${i > 0 ? 'ml-1' : ''}`}></i>
                                            ))}
                                        </div>
                                        <div className="mb-4 text-4xl text-primary/10">"</div>
                                        <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-primary text-left">{testimonial.content.split('.')[0]}!</h3>
                                        <p className="text-gray-600 mb-6 sm:mb-8 text-[13px] sm:text-[14px] leading-relaxed text-left">
                                            {testimonial.content}
                                        </p>
                                        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                            <img 
                                                src={testimonial.image_url || `https://i.pravatar.cc/50?img=${testimonial.id || 1}`} 
                                                alt={testimonial.name}
                                                className="w-14 h-14 rounded-full border-3 border-primary/20"
                                                onError={(e) => {
                                                    e.target.src = `https://i.pravatar.cc/50?img=${testimonial.id || 1}`;
                                                }}
                                            />
                                            <div className="text-left">
                                                <p className="font-bold text-[15px] text-primary">{testimonial.name}</p>
                                                <p className="text-xs text-gray-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500 py-8">No testimonials available at the moment.</div>
                            )}
                        </div>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    );
};

export default Home;
