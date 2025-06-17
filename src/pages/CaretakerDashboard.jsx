import React, { useState, useEffect } from 'react';
import './CaretakerDashboard.css';

const CaretakerDashboard = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch bookings from localStorage
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(storedBookings);
    }, []);

    const handleUpdateStatus = (id, newStatus) => {
        const updatedBookings = bookings.map((booking, index) =>
            index === id ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Accepted':
                return 'status-accepted';
            case 'Rejected':
                return 'status-rejected';
            default:
                return 'status-pending';
        }
    };

    return (
        <div className="caretaker-dashboard-container">
            <h2 className="heading">Received Bookings</h2>
            {bookings.length > 0 ? (
                <div className="bookings-list">
                    {bookings.map((booking, index) => (
                        <div key={index} className={`booking-card ${getStatusClass(booking.status)}`}>
                            <div className="booking-details">
                                <div>
                                    <p className="caretaker-name">{booking.caretakerName}</p>
                                    <p className="booking-date">{booking.date} at {booking.time}</p>
                                    <p className="patient-name">Patient: {booking.username}</p>
                                </div>
                                {booking.status === 'Pending' ? (
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => handleUpdateStatus(index, 'Accepted')}
                                            className="accept-button"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(index, 'Rejected')}
                                            className="reject-button"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <p className={`status-text ${booking.status === 'Accepted' ? 'text-accepted' : 'text-rejected'}`}>
                                        {booking.status}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-bookings-message">No bookings have been received yet.</p>
            )}
        </div>
    );
};

export default CaretakerDashboard;
