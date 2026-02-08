import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ padding: '1rem', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Mess Management</Link>
            </div>
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: '1rem' }}>Welcome, {user.name} ({user.role})</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#fff', marginRight: '1rem' }}>Login</Link>
                        <Link to="/register" style={{ color: '#fff' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
