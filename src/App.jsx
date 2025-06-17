import React, { useState, useEffect } from 'react';

// Page Imports
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/PatientDashboard';
import MyBookings from './pages/MyBookings';
import CaretakerDashboard from './pages/CaretakerDashboard';

// Component Imports
import Header from './components/Header';
import BookingModal from './components/BookingModal';
import MapModal from './components/MapModal';


export default function App() {
    const [page, setPage] = useState('login');
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [bookingCaretaker, setBookingCaretaker] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [mapCoordinates, setMapCoordinates] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('vitacureUser');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setPage(parsedUser.role === 'patient' ? 'patient-dashboard' : 'caretaker-dashboard');
        }

        const savedBookings = localStorage.getItem('vitacureBookings');
        if (savedBookings) {
            setBookings(JSON.parse(savedBookings));
        }

        const leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
        document.head.appendChild(leafletCss);

        const leafletJs = document.createElement('script');
        leafletJs.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        leafletJs.async = true;
        document.head.appendChild(leafletJs);

        return () => {
            if (document.head.contains(leafletCss)) document.head.removeChild(leafletCss);
            if (document.head.contains(leafletJs)) document.head.removeChild(leafletJs);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('vitacureBookings', JSON.stringify(bookings));
    }, [bookings]);

    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem('vitacureUser', JSON.stringify(loggedInUser));
        setPage(loggedInUser.role === 'patient' ? 'patient-dashboard' : 'caretaker-dashboard');
    };

    const handleManualLogin = (email, password) => {
        const credentials = {
            'patient@vitacure.in': { password: 'patient123', role: 'patient', name: 'John Doe' },
            'nurse@vitacure.in': { password: 'nurse123', role: 'caretaker', name: 'Jane Smith' }
        };
        if (credentials[email] && credentials[email].password === password) {
            handleLoginSuccess({ email, role: credentials[email].role, name: credentials[email].name });
        } else {
            alert('Invalid email or password.');
        }
    };

    const handleGoogleLogin = (googleUser) => {
        const hardcodedRoles = { 'nurse@vitacure.in': 'caretaker' };
        const role = hardcodedRoles[googleUser.email] || 'patient';
        handleLoginSuccess({ email: googleUser.email, name: googleUser.name, role: role });
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('vitacureUser');
        setPage('login');
    };

    const handleBookNow = (caretaker) => setBookingCaretaker(caretaker);
    
    const handleCreateBooking = (bookingDetails) => {
        setBookings([...bookings, {
            id: Date.now(), ...bookingDetails, patientName: user.name, patientEmail: user.email, status: 'Pending'
        }]);
        setBookingCaretaker(null);
        alert('Booking successful!');
    };

    const handleUpdateBookingStatus = (bookingId, status) => {
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
    };

    const handleViewMap = (coords) => {
        setMapCoordinates(coords);
        setShowMap(true);
    };

    const navigate = (targetPage) => setPage(targetPage);
    
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header user={user} onLogout={handleLogout} navigate={navigate} page={page} />
            <main className="p-4 sm:p-6 md:p-8">
                {page === 'login' && <LoginPage onManualLogin={handleManualLogin} onGoogleLogin={handleGoogleLogin} />}
                {page === 'patient-dashboard' && <PatientDashboard onBookNow={handleBookNow} />}
                {page === 'my-bookings' && <MyBookings bookings={bookings.filter(b => b.patientEmail === user?.email)} onViewMap={handleViewMap} />}
                {page === 'caretaker-dashboard' && <CaretakerDashboard bookings={bookings} onUpdateStatus={handleUpdateBookingStatus} />}
            </main>
            {bookingCaretaker && <BookingModal caretaker={bookingCaretaker} onClose={() => setBookingCaretaker(null)} onCreateBooking={handleCreateBooking} />}
            {showMap && <MapModal coordinates={mapCoordinates} onClose={() => setShowMap(false)} />}
        </div>
    );
}