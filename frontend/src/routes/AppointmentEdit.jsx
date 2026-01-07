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
        slotId: '',
        reasonForVisit: '',
    });

    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [filteredTimes, setFilteredTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        const fetchLatestData = async (id) => {
            try {
                const res = await fetch(`http://localhost:8000/api/appointments/${id}/?t=${Date.now()}`);
                if (res.ok) {
                    const freshData = await res.json();
                    setAppointment(freshData);
                }
            } catch (err) {
                console.error("Error refreshing data:", err);
            }
        };

        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);

        // Fetch available slots
        fetch('http://localhost:8000/api/slots/')
            .then(res => res.json())
            .then(data => {
                setAvailableSlots(data);
                // Extract unique dates
                const dates = [...new Set(data.map(slot => slot.date))];
                setAvailableDates(dates);
            })
            .catch(err => console.error("Error fetching slots:", err));

        // Get appointment from location state
        if (location.state && location.state.appointment) {
            const apt = location.state.appointment;
            setAppointment(apt);
            setFormData({
                fullName: apt.full_name,
                phoneNumber: apt.phone_number,
                email: apt.email || '',
                slotId: apt.slot,
                reasonForVisit: apt.reason,
            });
            setSelectedDate(apt.slot_details.date);

            // Re-fetch fresh data from server to be sure status is up to date
            fetchLatestData(apt.id);
        } else {
            // No appointment data, redirect
            alert('No appointment data found. Please search again.');
            navigate('/appointment-manage');
        }
    }, [location, navigate]);

    useEffect(() => {
        if (selectedDate && availableSlots.length > 0) {
            const timesAtDate = availableSlots.filter(slot => slot.date === selectedDate);
            // Include current slot in times if it's the one we are already booked for
            if (appointment && appointment.slot_details.date === selectedDate) {
                const alreadyBookedSlot = {
                    id: appointment.slot,
                    time: appointment.slot_details.time,
                    date: appointment.slot_details.date
                };
                if (!timesAtDate.find(s => s.id === alreadyBookedSlot.id)) {
                    timesAtDate.push(alreadyBookedSlot);
                }
            }
            setFilteredTimes(timesAtDate);
        }
    }, [selectedDate, availableSlots, appointment]);

    useEffect(() => {
        if (availableSlots.length > 0 || appointment) {
            let dates = [...new Set(availableSlots.map(slot => slot.date))];
            if (appointment && !dates.includes(appointment.slot_details.date)) {
                dates.push(appointment.slot_details.date);
            }
            setAvailableDates(dates.sort());
        }
    }, [availableSlots, appointment]);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        setFormData(prev => ({ ...prev, slotId: '' }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!appointment) return;
        setLoading(true);
        setError(null);

        const payload = {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            email: formData.email,
            slot: formData.slotId,
            reason: formData.reasonForVisit
        };

        try {
            const response = await fetch(`http://localhost:8000/api/appointments/${appointment.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to update appointment');

            const data = await response.json();
            setAppointment(data);
            setSuccessMessage('Your appointment details have been updated.');

            // Refresh slots
            const slotsRes = await fetch('http://localhost:8000/api/slots/');
            const updatedSlots = await slotsRes.json();
            setAvailableSlots(updatedSlots);

            // Scroll to success message
            setTimeout(() => {
                const element = document.getElementById('updateSuccessMessage');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        } catch (err) {
            console.error("Update error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!appointment) return;

        if (!window.confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/appointments/${appointment.id}/`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to cancel appointment');

            alert('Appointment has been cancelled successfully.');
            navigate('/appointment-manage');
        } catch (err) {
            console.error("Cancel error:", err);
            alert('Failed to cancel appointment. Please try again.');
        } finally {
            setLoading(false);
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
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold self-start sm:self-center capitalize ${appointment.status?.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' :
                                        appointment.status?.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {appointment.status || 'Pending'}
                                    </div>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                        <i className="fas fa-exclamation-circle mr-2"></i>{error}
                                    </div>
                                )}

                                <form onSubmit={handleUpdate}>
                                    <div className="space-y-6">
                                        {/* Appointment ID Display */}
                                        <div className="bg-cream p-4 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Appointment ID</p>
                                            <p className="text-xl font-bold text-primary">{appointment.formatted_id || appointment.id}</p>
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
                                                    value={appointment.date_of_birth}
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
                                            ></textarea>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                                            >
                                                <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-save'} mr-2`}></i>
                                                {loading ? 'Updating...' : 'Update Appointment'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                disabled={loading}
                                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                                            >
                                                <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-times-circle'} mr-2`}></i>
                                                {loading ? 'Cancelling...' : 'Cancel Appointment'}
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
