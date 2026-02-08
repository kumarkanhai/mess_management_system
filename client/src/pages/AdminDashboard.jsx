import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const [wasteData, setWasteData] = useState({
        date: new Date().toISOString().split('T')[0],
        mealType: 'Lunch',
        totalPrepared: 0,
        totalConsumed: 0,
        wasteQuantity: 0
    });

    const fetchStats = async () => {
        // Fetch stats logic here
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleWasteSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/admin/waste`, wasteData);
            alert('Waste logged successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Management Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Waste Estimation Input</h3>
                    <form onSubmit={handleWasteSubmit}>
                        <input type="date" value={wasteData.date} onChange={e => setWasteData({ ...wasteData, date: e.target.value })} required /><br />
                        <select value={wasteData.mealType} onChange={e => setWasteData({ ...wasteData, mealType: e.target.value })}>
                            <option>Breakfast</option><option>Lunch</option><option>Dinner</option>
                        </select><br />
                        <input type="number" placeholder="Prepared Count" value={wasteData.totalPrepared} onChange={e => setWasteData({ ...wasteData, totalPrepared: Number(e.target.value) })} /><br />
                        <input type="number" placeholder="Consumed Count" value={wasteData.totalConsumed} onChange={e => setWasteData({ ...wasteData, totalConsumed: Number(e.target.value) })} /><br />
                        <input type="number" placeholder="Waste (kg)" value={wasteData.wasteQuantity} onChange={e => setWasteData({ ...wasteData, wasteQuantity: Number(e.target.value) })} /><br />
                        <button type="submit">Log Waste</button>
                    </form>
                </div>

                <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Analytics Overview</h3>
                    <p>Reserved vs Prepared: (Graph Placeholder)</p>
                    <p>Consumption Trends: (Graph Placeholder)</p>
                    <p>Feedback Score: 4.5/5 (Placeholder)</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
