import React, { useState, useEffect } from 'react';
import StatusTimeline from '../components/StatusTimeline';
import './MyBookings.css';

const MyBookings = ({ onViewMap }) => {
    const [acceptedBookings, setAcceptedBookings] = useState([]);

    useEffect(() => {
        // Fetch bookings from localStorage and filter accepted ones
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const filteredBookings = storedBookings.filter(b => b.status === 'Accepted');
        setAcceptedBookings(filteredBookings);
    }, []);

    return (
        <div className="container">
            <h2 className="heading">My Bookings</h2>
            {acceptedBookings.length > 0 ? (
                <div className="bookings-container">
                    <ul className="bookings-list">
                        {acceptedBookings.slice().reverse().map((b, index) => (
                            <li key={index} className="booking-item">
                                <div className="booking-details">
                                    <p className="caretaker-name">Caretaker: {b.caretakerName}</p>
                                    <p className="booking-date">Date: {b.date} at {b.time}</p>
                                </div>
                                <div className="booking-actions">
                                    <StatusTimeline status={b.status} />
                                    <button
                                        onClick={() => onViewMap([14.9136, 79.9927])}
                                        className="view-map-button"
                                    >
                                        View Map
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="no-bookings-message">You have no accepted bookings yet.</p>
            )}
        </div>
    );
};

export default MyBookings;