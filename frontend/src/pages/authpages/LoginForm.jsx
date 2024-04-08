import React, { useState } from 'react';
import axios from 'axios';
import '../../App.scss';

import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            // Redirect or handle success
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to='/forgot-password' className="btn btn-primary">Forgot password?</Link>

            </form>
        </div>
    );
};

export default LoginForm;
