import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/TrackOrder.css";
import { AuthContext } from "../services/AuthContext";

const TrackOrder = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);
  const [ordersByRestaurant, setOrdersByRestaurant] = useState({});
  const [expandedRestaurant, setExpandedRestaurant] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/bagelsOrder/user/${user.uid}`
        );
        if (response.status === 200) {
          setUserOrders(response.data);
          const restaurantOrders = {};
          response.data.forEach((order) => {
            const restaurantName = order.restaurant || "Unknown Restaurant";
            if (!restaurantOrders[restaurantName]) {
              restaurantOrders[restaurantName] = [];
            }
            restaurantOrders[restaurantName].push(order);
          });
          setOrdersByRestaurant(restaurantOrders);
        } else {
          console.error(
            "Error fetching User Orders",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [user, navigate]);

  const restaurantNames = [
    "Don's at Walb",
    "Java Spot",
    "Einstein Bros.",
    "Bon Bon's Coffee",
  ];
  const toggleRestaurant = (restaurantName) => {
    setExpandedRestaurant((prev) =>
      prev === restaurantName ? null : restaurantName
    );
  };

  // Back button handler
  const handleBackToHome = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="track-order-container">
      <h2>Track Your Orders</h2>

      {/* Filter Section */}
      <div className="filters">
        {restaurantNames.map((restaurantName) => (
          <div className="filter-section" key={restaurantName}>
            <div
              className={`filter-header ${
                expandedRestaurant === restaurantName ? "expanded" : ""
              }`}
              onClick={() => toggleRestaurant(restaurantName)}
            >
              <span>{restaurantName}</span>
              <span className="icon">
                {expandedRestaurant === restaurantName ? "▼" : "▶"}
              </span>
            </div>
            <div
              className={`filter-content ${
                expandedRestaurant === restaurantName ? "expanded" : ""
              }`}
            >
              {ordersByRestaurant[restaurantName] &&
              ordersByRestaurant[restaurantName].length > 0 ? (
                <ul>
                  {ordersByRestaurant[restaurantName].map((order) => (
                    <li key={order.orderId}>
                      <p>Order ID: {order.orderId}</p>
                      <p>Status: {order.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-message">
                  No orders placed at this restaurant yet.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Button in the middle */}
      <div className="button-container">
        <button onClick={handleBackToHome} className="back-to-home-button">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TrackOrder;
