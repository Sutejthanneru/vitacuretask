import React, { useState } from 'react';

const BookingModal = ({ caretaker, username, onClose, onCreateBooking }) => {
    const [date, setDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);

        // Generate slots dynamically based on the selected date
        const generatedSlots = [
            '10:00 AM - 11:00 AM',
            '11:00 AM - 12:00 PM',
            '01:00 PM - 02:00 PM',
            '02:00 PM - 03:00 PM',
        ]; // Example slots
        setSlots(generatedSlots);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !selectedSlot) {
            alert('Please select a date and slot.');
            return;
        }

        const newBooking = {
            caretakerName: caretaker.name,
            username, // Include the username
            date,
            time: selectedSlot,
            status: 'Pending',
        };

        // Save booking to localStorage
        const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));

        onCreateBooking(newBooking); // Update state with the new booking
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Book {caretaker.name}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="input-field"
                    />
                    {slots.length > 0 && (
                        <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            required
                            className="input-field"
                        >
                            <option value="" disabled>Select a slot</option>
                            {slots.map((slot, index) => (
                                <option key={index} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                    )}
                    <div className="button-group">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" className="btn-confirm">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
