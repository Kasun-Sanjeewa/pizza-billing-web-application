import React, { useState } from 'react';
import './CSS/SignIn.css';

const SignIn = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // API endpoint for login
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                if (data.message) {
                    onLogin(true); // Pass true to indicate successful login
                } else {
                    setError('Invalid username or password');
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    // Render the SignIn component
    return (
        <div className="signin-container">
            <div className="signin-left">
                <h2>Sign in to Billing System</h2>
                <form onSubmit={handleLogin}>
                    <div className="sign-form-group">
                        <input
                            type="text"
                            placeholder="User name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="sign-form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className='signin-btn'>SIGN IN</button>
                </form>
            </div>
            <div className="signin-right">
                <div className="welcome-message">
                    <h2>Welcome Back!</h2>
                    <p>To keep connected with us, please log in with your personal info.</p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
