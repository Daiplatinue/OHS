import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './sections/Home';
import Login from './sections/Login';
import LoginAlt from './sections/LoginAlt';
import Transaction from './sections/Transaction';

import ChatRTC from './sections/Styles/ChatRTC';

import Notification from './sections/Customer_Tabs/Notification';

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

        {/* Chat */}
        <Route path='/chat' element={<ChatRTC />} />
        
        {/* Customer Tabs */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login-alt' element={<LoginAlt />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/notification' element={<Notification />} />

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