import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './sections/Home';
import Login from './sections/Login';
import HeroSection from './sections/HeroSection';
import Transaction from './sections/Transaction';

import Notification from './sections/Customer_Tabs/Notification';
import MyBookings from './sections/Customer_Tabs/MyBookings'; 

import Admin from './sections/Admin';
import Admin_Transaction from './sections/Admin_Tabs/Admin_Transactions';

import Ceo from './sections/Ceo';
import MyBalance from './sections/Ceo_Tabs/MyBalance';
import Bookings from './sections/Ceo_Tabs/Bookings';
import Services from './sections/Ceo_Tabs/Services';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Customer Tabs */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hero' element={<HeroSection />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/customer/my-bookings' element={<MyBookings />} />

        {/* Admin Tabs */}
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/transactions' element={<Admin_Transaction />} />

        {/* Ceo Tabs */}
        <Route path='/ceo' element={<Ceo />} />
        <Route path='/ceo/my-balance' element={<MyBalance />} />
        <Route path='/ceo/bookings' element={<Bookings />} />
        <Route path='/ceo/services' element={<Services />} />

      </Routes>
    </BrowserRouter>
  );
};


export default App;