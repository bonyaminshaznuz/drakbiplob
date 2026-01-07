import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AppointmentEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [minDate, setMinDate] = useState('');

    // Values being edited
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        appointmentDate: '',
        appointmentTime: '',
        reasonForVisit: '',
        additionalNotes: ''
    });

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);

        // Get appointment from location state
        if (location.state && location.state.appointment) {
            const apt = location.state.appointment;
            setAppointment(apt);
            setFormData({
                fullName: apt.fullName,
                phoneNumber: apt.phoneNumber,
                email: apt.email || '',
                appointmentDate: apt.appointmentDate,
                appointmentTime: apt.appointmentTime,
                reasonForVisit: apt.reasonForVisit,
                additionalNotes: apt.additionalNotes || ''
            });
        } else {
            // No appointment data, redirect
            alert('No appointment data found. Please search again.');
            navigate('/appointment-manage');
        }
    }, [location, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!appointment) return;

        // Get appointments from localStorage
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

        // Find and update
        const index = appointments.findIndex(apt => apt.id === appointment.id);

        if (index !== -1) {
            const updatedAppointment = {
                ...appointments[index],
                ...formData,
                updatedAt: new Date().toISOString()
            };

            appointments[index] = updatedAppointment;
            localStorage.setItem('appointments', JSON.stringify(appointments));

            setAppointment(updatedAppointment);
            setSuccessMessage('Your appointment details have been updated.');

            // Scroll to success message
            setTimeout(() => {
                const element = document.getElementById('updateSuccessMessage');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    };

    const handleCancel = () => {
        if (!appointment) return;

        if (!window.confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
            return;
        }

        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const index = appointments.findIndex(apt => apt.id === appointment.id);

        if (index !== -1) {
            appointments[index].status = 'Cancelled';
            appointments[index].cancelledAt = new Date().toISOString();

            localStorage.setItem('appointments', JSON.stringify(appointments));
            setAppointment(appointments[index]);
            alert('Appointment has been cancelled successfully.');
        }
    };


    if (!appointment) return null;

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Appointment Details Section */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-8 sm:mb-12">
                                <div className="inline-block mb-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg">
                                        <i className="fas fa-edit text-2xl sm:text-3xl text-white"></i>
                                    </div>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">Edit Appointment</h1>
                                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">View and update your appointment details</p>
                            </div>

                            {/* Appointment Details */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b gap-4">
                                    <h2 className="text-2xl font-bold text-primary">Appointment Details</h2>
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold self-start sm:self-center ${appointment.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {appointment.status || 'Pending'}
                                    </div>
                                </div>

                                <form onSubmit={handleUpdate}>
                                    <div className="space-y-6">
                                        {/* Appointment ID Display */}
                                        <div className="bg-cream p-4 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Appointment ID</p>
                                            <p className="text-xl font-bold text-primary">{appointment.id}</p>
                                        </div>

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
                                                />
                                            </div>

                                            {/* Date of Birth (Read Only) */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <i className="fas fa-birthday-cake text-primary mr-2"></i>Date of Birth
                                                </label>
                                                <input
                                                    type="date"
                                                    value={appointment.dateOfBirth}
                                                    readOnly
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
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
                                            ></textarea>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t">
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                                            >
                                                <i className="fas fa-save mr-2"></i>Update Appointment
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                                            >
                                                <i className="fas fa-times-circle mr-2"></i>Cancel Appointment
                                            </button>
                                            <Link
                                                to="/appointment-manage"
                                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-center cursor-pointer"
                                            >
                                                <i className="fas fa-arrow-left mr-2"></i>Back to Search
                                            </Link>
                                        </div>
                                    </div>
                                </form>

                                {/* Update Success Message */}
                                {successMessage && (
                                    <div id="updateSuccessMessage" className="mt-6 p-4 sm:p-6 bg-green-50 border-2 border-green-500 rounded-xl animate-fade-in">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-check text-white text-lg sm:text-xl"></i>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">Appointment Updated Successfully!</h3>
                                                <p className="text-sm sm:text-base text-green-700">{successMessage}</p>
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

export default AppointmentEdit;
