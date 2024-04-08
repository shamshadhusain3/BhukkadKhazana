import React, { useState } from 'react';
import '../../App.scss';

import axios from 'axios';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/forgot-password', { email });
            alert('Password reset email sent!');
            // Redirect or handle success
        } catch (error) {
            console.error('Forgot password error:', error);
            alert('Failed to send password reset email. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" placeholder="Email" value={email} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Send Password Reset Email</button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
