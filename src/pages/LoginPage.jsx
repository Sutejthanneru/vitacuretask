import React, { useState, useEffect } from 'react';
import './LoginPage.css';

const LoginPage = ({ onManualLogin, onGoogleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: '987133264139-67n4bu0nflt14v9bvksjeshtl58bqfjb.apps.googleusercontent.com',
                    callback: (res) => onGoogleLogin(JSON.parse(atob(res.credential.split('.')[1]))),
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('googleSignInButton'),
                    { theme: 'outline', size: 'large', width: '300' }
                );
            }
        };
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [onGoogleLogin]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onManualLogin(email, password);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-heading">Sign in to your account</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                            placeholder="Email address (e.g., patient@vitacure.in)"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                            placeholder="Password (e.g., patient123)"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">Sign in</button>
                    </div>
                </form>
                <div className="divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">Or</span>
                    <div className="divider-line"></div>
                </div>
                <div id="googleSignInButton" className="google-signin"></div>
                <div className="test-credentials">
                    <p className="credentials-heading">Test Credentials:</p>
                    <p><strong>Patient:</strong> patient@vitacure.in / patient123</p>
                    <p><strong>Caretaker:</strong> nurse@vitacure.in / nurse123</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;