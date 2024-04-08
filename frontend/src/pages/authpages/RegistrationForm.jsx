import React, { useState } from 'react';
import '../../App.scss';


import axios from 'axios';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/register', formData);
            alert('Registration successful!');
            // Redirect or handle success
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                
                <span>already have an account?</span> <Link to="/login" className="btn btn-primary">Login</Link>
            </form>
        </div>
    );
};

export default RegistrationForm;
