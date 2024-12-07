import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Menu from './components/Menu';
import BonsMenu from './components/BonsMenu';
import DonsMenu from './components/DonsMenu';
import BonsNavBar from './components/BonsNavBar';
import DonsNavBar from './components/DonsNavBar';
import { AuthProvider } from './services/AuthContext'; 
import { AuthContext } from './services/AuthContext'; 
import Dashboard from './components/Dashboard';
import BonsDashboard from './components/BonsDashboard';
import DonsDashboard from './components/DonsDashboard';
import { useContext } from 'react'; 
import axios from 'axios'; 
import NavBar from './components/NavBar';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import TrackOrder from './components/TrackOrder'; 
import RestaurantsHeader from './components/RestaurantsHeader';
import RestaurantsData  from './data/Restaurants';
import './styles/App.css'; 
// import { bonsMenuItems } from './components/bonsMenuItems';

const App = () => {
  // const [selectedCategory, setSelectedCategory] = useState('Egg Sandwiches');
  const [activeCategory, setActiveCategory] = useState('Egg Sandwiches');
  const [bonsSelectedCategory, setBonsSelectedCategory] = useState('Coffee & Espresso');
  const [donsSelectedCategory, setDonsSelectedCategory] = useState('Epic Eats'); // Default for Bon Bon's
  const [einsteinCartItems, setEinsteinCartItems] = useState({});  // Einstein's cart
  const [bonsCartItems, setBonsCartItems] = useState({});  
  const [donsCartItems, setDonsCartItems] = useState({});        // Bon Bon's cart

  const PrivateRoute = ({ element, ...rest }) => {
    const { user } = useContext(AuthContext);
    return user ? element : <Navigate to="/login" />; // Redirect to login if no user
  };
  const [menuItems, setMenuItems] = useState({});
  const [bonsMenuItems, setBonsMenuItems] = useState({});
  const [donsMenuItems, setDonsMenuItems] = useState({});

   useEffect(() => {
    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/menuItems');
            setMenuItems(response.data);
        } catch (error) {
            //Handle error.
        }

    };
    const fetchBonsMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/bonsMenuItems');
        setBonsMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching Bon Bon's menu items:", error);
      }
    };

    const fetchDonsMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/donsMenuItems');
        setDonsMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching Don's menu items:", error);
      }
    };


    fetchMenuItems();
    fetchBonsMenuItems();
    fetchDonsMenuItems();
}, []);



  return (
    <AuthProvider>
    <Router>
      {/* <Header/> */}
      <div className="app-container">
      
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bonsdashboard" element={<BonsDashboard />} />
          <Route path="/donsdashboard" element={<DonsDashboard />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/orderConfirmation" element={<OrderConfirmation />} />
          <Route path='/trackOrder' element={<TrackOrder />} /> 
          {/* <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard /> 
        </PrivateRoute>
      }
    /> */}
          {/* Example for Einstein Bros. */}
          <Route 
            path="/EinsteinBros" 
            element={
              <> 
                <RestaurantsHeader cartItems={einsteinCartItems} setCartItems={setEinsteinCartItems} menuItems={menuItems} restaurant={RestaurantsData["Einstein Bros."]} />
                <NavBar onCategorySelect={setActiveCategory} activeCategory={activeCategory} />
                <Menu category={activeCategory} cartItems={einsteinCartItems} setCartItems={setEinsteinCartItems} />
              </>
            } 
          />
          <Route 
            path="/bonsmenu" 
            element={
              <> 
                {/* <Header cartItems={bonsCartItems} setCartItems={setBonsCartItems} menuItems={bonsMenuItems} /> */}
                <RestaurantsHeader cartItems={bonsCartItems} setCartItems={setBonsCartItems} menuItems={bonsMenuItems} restaurant={RestaurantsData["Bon Bon's Coffee"]} />
                <BonsNavBar onCategorySelect={setBonsSelectedCategory} activeCategory={bonsSelectedCategory} />
                <BonsMenu category={bonsSelectedCategory} cartItems={bonsCartItems} setCartItems={setBonsCartItems} />
              </>
            } 
          />
          <Route 
            path="/donsmenu" 
            element={
              <> 
                {/* <Header cartItems={bonsCartItems} setCartItems={setBonsCartItems} menuItems={bonsMenuItems} /> */}
                <RestaurantsHeader cartItems={donsCartItems} setCartItems={setDonsCartItems} menuItems={donsMenuItems} restaurant={RestaurantsData["Don's at Walb"]} />
                <DonsNavBar onCategorySelect={setDonsSelectedCategory} activeCategory={donsSelectedCategory} />
                <DonsMenu category={donsSelectedCategory} cartItems={donsCartItems} setCartItems={setDonsCartItems} />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
