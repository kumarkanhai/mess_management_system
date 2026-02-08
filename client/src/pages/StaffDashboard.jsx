import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffDashboard = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await axios.get('https://mess-management-system-backend-fq5e.onrender.com/api/reservations');
                setReservations(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReservations();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Mess Staff Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3>Food Requirements</h3>
                    <p>Total Reservations Today: {reservations.length}</p>
                    {/* Aggregation logic needed here */}
                </div>

                <div>
                    <h3>Reservation List</h3>
                    <ul>
                        {reservations.map(res => (
                            <li key={res._id}>
                                {res.userId?.name} - {res.mealType} ({new Date(res.date).toLocaleDateString()}) - Status: {res.status}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
