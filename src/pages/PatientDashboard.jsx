import React, { useState } from 'react';
import CaretakerCard from '../components/CaretakerCard';
import BookingModal from '../components/BookingModal';
import './PatientDashboard.css';

const PatientDashboard = () => {
    const caretakers = [
        { id: 1, name: 'Dr. Emily Carter', specialty: 'Geriatrics', image: 'https://placehold.co/400x400/E2E8F0/4A5568?text=EC' },
        { id: 2, name: 'Michael Chen', specialty: 'Pediatrics', image: 'https://placehold.co/400x400/E2E8F0/4A5568?text=MC' },
        { id: 3, name: 'Sarah Jones', specialty: 'Post-operative Care', image: 'https://placehold.co/400x400/E2E8F0/4A5568?text=SJ' },
        { id: 4, name: 'David Rodriguez', specialty: 'Physical Therapy', image: 'https://placehold.co/400x400/E2E8F0/4A5568?text=DR' },
    ];

    const [selectedCaretaker, setSelectedCaretaker] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBookNow = (caretaker) => {
        console.log('Booking button clicked for:', caretaker.name);
        setSelectedCaretaker(caretaker);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCaretaker(null);
    };

    const handleCreateBooking = (newBooking) => {
        const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
        alert('Booking created successfully!');
    };

    return (
        <div className="container">
            <h2 className="heading">Available Caretakers</h2>
            <div className="caretakers-grid">
                {caretakers.map(c => (
                    <CaretakerCard key={c.id} caretaker={c} onBookNow={() => handleBookNow(c)} />
                ))}
            </div>
            {isModalOpen && selectedCaretaker && (
                <BookingModal
                    caretaker={selectedCaretaker}
                    username="JohnDoe" // Replace with dynamic username if needed
                    onClose={handleCloseModal}
                    onCreateBooking={handleCreateBooking}
                />
            )}
        </div>
    );
};

export default PatientDashboard;