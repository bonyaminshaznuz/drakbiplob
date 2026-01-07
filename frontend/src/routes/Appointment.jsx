import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Appointment = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        appointmentDate: '',
        appointmentTime: '',
        reasonForVisit: '',
        additionalNotes: ''
    });

    const [successData, setSuccessData] = useState(null);
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate Appointment ID
        const appointmentId = 'APT' + Date.now().toString().slice(-8);

        // Create appointment object
        const appointment = {
            id: appointmentId,
            ...formData,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };

        // Get existing appointments from localStorage
        const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

        // Add new appointment
        existingAppointments.push(appointment);

        // Save to localStorage
        localStorage.setItem('appointments', JSON.stringify(existingAppointments));

        // Show success message
        setSuccessData({
            id: appointmentId,
            message: 'Your appointment has been scheduled. Please save your appointment ID for future reference.'
        });

        // Reset form
        setFormData({
            fullName: '',
            dateOfBirth: '',
            phoneNumber: '',
            email: '',
            appointmentDate: '',
            appointmentTime: '',
            reasonForVisit: '',
            additionalNotes: ''
        });

        // Scroll to top or success message slightly
        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Appointment Booking Section */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-8 sm:mb-12">
                                <div className="inline-block mb-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg">
                                        <i className="fas fa-calendar-check text-2xl sm:text-3xl text-white"></i>
                                    </div>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">Book Your Appointment</h1>
                                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                                    Fill in the form below to schedule your appointment with Dr. Abul Khayer (Biplob)
                                </p>
                            </div>

                            {/* Appointment Form */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-user text-primary mr-2"></i>Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-birthday-cake text-primary mr-2"></i>Date of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                            />
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-phone text-primary mr-2"></i>Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                                placeholder="+880 1712-345678"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-envelope text-primary mr-2"></i>Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        {/* Appointment Date */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-calendar text-primary mr-2"></i>Appointment Date *
                                            </label>
                                            <input
                                                type="date"
                                                name="appointmentDate"
                                                value={formData.appointmentDate}
                                                onChange={handleChange}
                                                min={minDate}
                                                required
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                            />
                                        </div>

                                        {/* Appointment Time */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-clock text-primary mr-2"></i>Preferred Time *
                                            </label>
                                            <select
                                                name="appointmentTime"
                                                value={formData.appointmentTime}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                            >
                                                <option value="">Select Time</option>
                                                <option value="09:00">09:00 AM</option>
                                                <option value="09:30">09:30 AM</option>
                                                <option value="10:00">10:00 AM</option>
                                                <option value="10:30">10:30 AM</option>
                                                <option value="11:00">11:00 AM</option>
                                                <option value="11:30">11:30 AM</option>
                                                <option value="14:00">02:00 PM</option>
                                                <option value="14:30">02:30 PM</option>
                                                <option value="15:00">03:00 PM</option>
                                                <option value="15:30">03:30 PM</option>
                                                <option value="16:00">04:00 PM</option>
                                                <option value="16:30">04:30 PM</option>
                                                <option value="17:00">05:00 PM</option>
                                                <option value="17:30">05:30 PM</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Reason for Visit */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <i className="fas fa-notes-medical text-primary mr-2"></i>Reason for Visit *
                                        </label>
                                        <textarea
                                            name="reasonForVisit"
                                            value={formData.reasonForVisit}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                            placeholder="Please describe your symptoms or reason for appointment"
                                        ></textarea>
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <i className="fas fa-comment text-primary mr-2"></i>Additional Notes
                                        </label>
                                        <textarea
                                            name="additionalNotes"
                                            value={formData.additionalNotes}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                            placeholder="Any additional information you'd like to share"
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                                        >
                                            <i className="fas fa-check-circle mr-2"></i>Book Appointment
                                        </button>
                                        <Link to="/appointment-manage" className="flex-1 bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-center cursor-pointer">
                                            <i className="fas fa-search mr-2"></i>View Existing Appointment
                                        </Link>
                                    </div>
                                </form>

                                {/* Success Message */}
                                {successData && (
                                    <div className="mt-6 p-4 sm:p-6 bg-green-50 border-2 border-green-500 rounded-xl animate-fade-in">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-check text-white text-lg sm:text-xl"></i>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">Appointment Booked Successfully!</h3>
                                                <p className="text-sm sm:text-base text-green-700 mb-3">{successData.message}</p>
                                                <div className="bg-white p-3 sm:p-4 rounded-lg border border-green-300">
                                                    <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">Your Appointment ID:</p>
                                                    <p className="text-xl sm:text-2xl font-bold text-primary">{successData.id}</p>
                                                    <p className="text-xs sm:text-sm text-gray-600 mt-2">Please keep this ID and your date of birth to view or update your appointment.</p>
                                                </div>
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

export default Appointment;
