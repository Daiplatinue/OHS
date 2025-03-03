import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './sections/Home';
import Login from './sections/Login';
import HeroSection from './sections/HeroSection';
import Transaction from './sections/Transaction';
import Admin from './sections/Admin';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hero' element={<HeroSection />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/admin' element={<Admin />} />


      </Routes>
    </BrowserRouter>
  );
};


export default App;