import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [menu, setMenu] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/menu?date=${selectedDate}`);
                setMenu(res.data);
            } catch (error) {
                console.error("Error fetching menu", error);
            }
        };
        fetchMenu();
    }, [selectedDate]);

    const handleReserve = async (menuItem) => {
        try {
            await axios.post(`${API_BASE_URL}/api/reservations`, {
                userId: user._id,
                menuId: menuItem._id,
                date: selectedDate,
                mealType: menuItem.mealType
            });
            alert('Reserved successfully!');
        } catch (error) {
            alert('Failed to reserve: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Student Dashboard</h1>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

            <h2>Today's Meals</h2>
            {menu.length === 0 ? <p>No menu available for this date.</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {menu.map(m => (
                        <div key={m._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                            <h3>{m.mealType}</h3>
                            <ul>
                                {m.items.map((item, idx) => (
                                    <li key={idx}>
                                        <strong>{item.name}</strong> - {item.nutritionInfo?.calories} kcal
                                        <br />Protein: {item.nutritionInfo?.protein}g
                                    </li>
                                ))}
                            </ul>
                            <p>Status: {m.availability ? 'Available' : 'Unavailable'}</p>
                            {m.availability && (
                                <button onClick={() => handleReserve(m)} style={{ background: '#007bff', color: 'white', padding: '0.5rem', border: 'none', cursor: 'pointer' }}>Reserve Meal</button>
                            )}
                            <div style={{ marginTop: '1rem' }}>
                                <h4>Feedback</h4>
                                <button>Give Feedback</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
