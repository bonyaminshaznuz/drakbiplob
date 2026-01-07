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
        slotId: '', // Changed to slotId
        reasonForVisit: '',
    });

    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [filteredTimes, setFilteredTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [availableDates, setAvailableDates] = useState([]);
    const [successData, setSuccessData] = useState(null);
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        // Fetch available slots
        fetch('http://localhost:8000/api/slots/')
            .then(res => res.json())
            .then(data => {
                setAvailableSlots(data);
                // Extract unique dates
                const dates = [...new Set(data.map(slot => slot.date))].sort();
                setAvailableDates(dates);
            })
            .catch(err => console.error("Error fetching slots:", err));
    }, []);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        const timesAtDate = availableSlots.filter(slot => slot.date === date);
        setFilteredTimes(timesAtDate);
        setFormData(prev => ({ ...prev, slotId: '' })); // Reset slot when date changes
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            full_name: formData.fullName,
            date_of_birth: formData.dateOfBirth,
            phone_number: formData.phoneNumber,
            email: formData.email,
            slot: formData.slotId, // This is the ID of the selected AvailableSlot
            reason: formData.reasonForVisit
        };

        try {
            const response = await fetch('http://localhost:8000/api/appointments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData) || 'Failed to book appointment');
            }

            const data = await response.json();

            // Show success message
            setSuccessData({
                id: data.id,
                formatted_id: data.formatted_id,
                message: 'Your appointment has been scheduled successfully.'
            });

            // Reset form
            setFormData({
                fullName: '',
                dateOfBirth: '',
                phoneNumber: '',
                email: '',
                slotId: '',
                reasonForVisit: '',
            });
            setSelectedDate('');
            setFilteredTimes([]);

            // Refresh slots
            const slotsRes = await fetch('http://localhost:8000/api/slots/');
            const updatedSlots = await slotsRes.json();
            setAvailableSlots(updatedSlots);

            window.scrollTo({ top: 200, behavior: 'smooth' });
        } catch (err) {
            console.error("Booking error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
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

                                {/* Success Message */}
                                {successData && (
                                    <div className="mb-8 p-4 sm:p-6 bg-green-50 border-2 border-green-500 rounded-xl animate-fade-in">
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
                                                    <p className="text-xl sm:text-2xl font-bold text-primary">{successData.formatted_id || successData.id}</p>
                                                    <p className="text-xs sm:text-sm text-gray-600 mt-2">Please keep this ID and your date of birth to view or update your appointment.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                                            <select
                                                name="appointmentDate"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                required
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none"
                                            >
                                                <option value="">Select Date</option>
                                                {availableDates.map(date => (
                                                    <option key={date} value={date}>{date}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Appointment Time */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <i className="fas fa-clock text-primary mr-2"></i>Preferred Time *
                                            </label>
                                            <select
                                                name="slotId"
                                                value={formData.slotId}
                                                onChange={handleChange}
                                                required
                                                disabled={!selectedDate}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none disabled:bg-gray-100"
                                            >
                                                <option value="">{selectedDate ? 'Select Time' : 'Select Date First'}</option>
                                                {filteredTimes.map(slot => (
                                                    <option key={slot.id} value={slot.id}>{slot.time}</option>
                                                ))}
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
                                    {/* <div>
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
                                    </div> */}

                                    {/* Submit Button */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                                        >
                                            <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-check-circle'} mr-2`}></i>
                                            {loading ? 'Booking...' : 'Book Appointment'}
                                        </button>
                                        <Link to="/appointment-manage" className="flex-1 bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-center cursor-pointer">
                                            <i className="fas fa-search mr-2"></i>View Existing Appointment
                                        </Link>
                                    </div>
                                </form>

                                {error && (
                                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                        <i className="fas fa-exclamation-circle mr-2"></i>{error}
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
