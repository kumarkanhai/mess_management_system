import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        studentId: '' // optional
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(formData);
        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Name</label>
                    <input name="name" onChange={handleChange} required style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Email</label>
                    <input name="email" type="email" onChange={handleChange} required style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Password</label>
                    <input name="password" type="password" onChange={handleChange} required style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Role</label>
                    <select name="role" onChange={handleChange} style={{ width: '100%' }}>
                        <option value="student">Student</option>
                        <option value="admin">Admin (Management)</option>
                        <option value="staff">Mess Staff</option>
                    </select>
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.5rem', background: 'green', color: 'white' }}>Register</button>
            </form>
        </div>
    );
};

export default Register;
