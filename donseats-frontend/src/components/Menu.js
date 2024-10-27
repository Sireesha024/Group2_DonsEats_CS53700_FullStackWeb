import React, { useState } from 'react';
import '../styles/Header.css';
import '../styles/NavBar.css';
import '../styles/Menu.css';
import Cart from './Cart';
import { menuItems } from './menuItems'; 

const Menu = ({ cartItems, setCartItems }) => {
  const [activeCategory, setActiveCategory] = useState('Egg Sandwiches'); // Default category
  const categories = ['Egg Sandwiches', 'Signature Lunch', 'Beverages', 'Espresso'];

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  const items = menuItems[activeCategory] || {};

  const handleAddToCart = (itemId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: (prevCartItems[itemId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      if (prevCartItems[itemId] > 1) {
        return {
          ...prevCartItems,
          [itemId]: prevCartItems[itemId] - 1,
        };
      } else {
        // If quantity is 1, remove the item from the cart
        const { [itemId]: _, ...rest } = prevCartItems;
        return rest;
      }
    });
  };

  return (
    <div className="app-container">
      <section className="menu-section">
        {Object.entries(items).map(([subcategory, subItems]) => (
          <div key={subcategory} className="menu-category">
            <h2>{subcategory}</h2>
            <div className="menu-items">
              {subItems.map((item, index) => (
                <div key={index} className="menu-item">
                  <img src={item.imageUrl} alt={item.title} className="menu-item-image" />
                  <div className="menu-item-details">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="menu-item-price">${item.price}</span>
                  </div>
                  <div className="menu-item-actions">
                    <button 
                      className="decrement-button" 
                      onClick={() => handleRemoveFromCart(item.title)} 
                      disabled={!cartItems[item.title]} 
                    >
                      -
                    </button>
                    <span>{cartItems[item.title] || 0}</span>
                    <button 
                      className="increment-button" 
                      onClick={() => handleAddToCart(item.title)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <section className="info-section">
          <div className="info-box delivery-info">
            <h3>Delivery Information</h3>
            <p>Monday: 12:00 AM–3:00 AM, 8:00 AM–3:00 AM</p>
            <p>Tuesday: 8:00 AM–3:00 AM</p>
            <p>Wednesday: 8:00 AM–3:00 AM</p>
            <p>Thursday: 8:00 AM–3:00 AM</p>
            <p>Friday: 8:00 AM–3:00 AM</p>
            <p>Saturday: 8:00 AM–3:00 AM</p>
            <p>Sunday: 8:00 AM–12:00 AM</p>
            <p>Estimated time until delivery: 20 min</p>
          </div>
          
          <div className="info-box contact-info">
            <h3>Contact Information</h3>
            <p>If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.</p>
            <p>Phone number: +1 (260)-123-4567</p>
            <p>Website: <a href="https://einsteinbagels.com/" target="_blank" rel="noopener noreferrer">https://einsteinbagels.com/</a></p>
          </div>

          <div className="info-box operational-times">
            <h3>Operational Times</h3>
            <p>Monday: 8:00 AM–3:00 AM</p>
            <p>Tuesday: 8:00 AM–3:00 AM</p>
            <p>Wednesday: 8:00 AM–3:00 AM</p>
            <p>Thursday: 8:00 AM–3:00 AM</p>
            <p>Friday: 8:00 AM–3:00 AM</p>
            <p>Saturday: 8:00 AM–3:00 AM</p>
            <p>Sunday: 8:00 AM–3:00 AM</p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Menu;