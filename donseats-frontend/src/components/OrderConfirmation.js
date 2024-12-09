import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/OrderConfirmation.css'; // Create CSS file for styling

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate
    const { orderId } = location.state || {};

    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="confirmation-container">
            <h2>Order Confirmed!</h2>
            <p>Your order ID is: {orderId}</p>
            <button onClick={handleBackToHome} className="back-to-home-button">
                Back to Home
            </button>
        </div>
    );
};

export default OrderConfirmation;
