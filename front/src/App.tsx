import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './sections/Home';
import Login from './sections/Login';
import HeroSection from './sections/HeroSection';
import Transaction from './sections/Transaction';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hero' element={<HeroSection />} />
        <Route path='/transaction' element={<Transaction />} />


      </Routes>
    </BrowserRouter>
  );
};


export default App;