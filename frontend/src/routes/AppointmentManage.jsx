import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AppointmentManage = () => {
    const [searchId, setSearchId] = useState('');
    const [searchDob, setSearchDob] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const response = await fetch(`http://localhost:8000/api/appointments/${searchId.trim()}/?t=${Date.now()}`);
            if (!response.ok) {
                setError('Appointment not found. Please check the ID.');
                return;
            }
            const data = await response.json();

            if (data.date_of_birth === searchDob) {
                navigate('/appointment-edit', { state: { appointment: data } });
            } else {
                setError('Date of Birth does not match.');
            }
        } catch (err) {
            console.error("Search error:", err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Search Section */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-8 sm:mb-12">
                                <div className="inline-block mb-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg">
                                        <i className="fas fa-calendar-alt text-2xl sm:text-3xl text-white"></i>
                                    </div>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">View & Update Appointment</h1>
                                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                                    Enter your Appointment ID and Date of Birth to view or update your appointment details
                                </p>
                            </div>

                            {/* Search Form */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8">
                                <form onSubmit={handleSearch} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Appointment ID */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-id-card text-primary mr-2"></i>Appointment ID *
                                            </label>
                                            <input
                                                type="text"
                                                value={searchId}
                                                onChange={(e) => setSearchId(e.target.value)}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                                placeholder="e.g., J01011990123"
                                            />
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-birthday-cake text-primary mr-2"></i>Date of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                value={searchDob}
                                                onChange={(e) => setSearchDob(e.target.value)}
                                                required
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Search Button */}
                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-8 py-4 rounded-full text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                                        >
                                            <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-search'} mr-2`}></i>
                                            {loading ? 'Searching...' : 'Search Appointment'}
                                        </button>
                                    </div>
                                </form>

                                {/* Error Message */}
                                {error && (
                                    <div className="mt-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl animate-fade-in">
                                        <div className="flex items-start gap-3">
                                            <i className="fas fa-exclamation-circle text-red-500 text-xl mt-0.5"></i>
                                            <div>
                                                <h3 className="text-lg font-bold text-red-800 mb-1">Search Error</h3>
                                                <p className="text-red-700 text-sm">
                                                    {error}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AppointmentManage;
