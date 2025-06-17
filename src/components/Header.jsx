import React from 'react';
import './Header.css';

const Header = ({ user, onLogout, navigate, page }) => (
    <header className="header">
        <nav className="nav-container">
            <div className="nav-content">
                <div className="logo-section">
                    <svg className="logo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="logo-text">Vitacure</span>
                </div>
                <div className="button-group">
                    {user?.role === 'patient' && (
                        <>
                            <button
                                onClick={() => navigate('patient-dashboard')}
                                className={`nav-button ${page === 'patient-dashboard' ? 'active' : ''}`}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => navigate('my-bookings')}
                                className={`nav-button ${page === 'my-bookings' ? 'active' : ''}`}
                            >
                                My Bookings
                            </button>
                        </>
                    )}
                    {user && (
                        <button onClick={onLogout} className="logout-button">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    </header>
);

export default Header;
