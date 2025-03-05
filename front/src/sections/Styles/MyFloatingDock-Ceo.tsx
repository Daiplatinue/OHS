import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircleMore, PowerOff, Mail, Bell, CircleUserRound, Newspaper, PhilippinePeso, Album, Droplet } from 'lucide-react';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, to, isActive }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 cursor-pointer transition-all duration-200 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'
        }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center justify-center transition-all duration-200 ${isActive ? 'text-white' : isHovered ? 'text-white' : 'text-gray-400'
          }`}
      >
        {icon}
      </div>

      {/* Label with animation */}
      <div
        className={`absolute -top-8 bg-sky-400 text-white text-xs px-2 py-1 rounded-md opacity-0 transition-all duration-200 ${isHovered ? 'opacity-100 transform translate-y-0' : 'transform translate-y-2'
          }`}
      >
        {label}
      </div>
    </div>
  );
};

const FloatingDock: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-200/40 backdrop-blur-lg rounded-full shadow-lg px-2 py-1 flex items-center transition-all duration-200 hover:shadow-xl">
      <DockItem
        icon={<Home size={20} strokeWidth={1.5} color='gray' />}
        label="Home"
        to="/ceo"
        isActive={location.pathname === '/ceo'}
      />
      <DockItem
        icon={<PhilippinePeso size={20} strokeWidth={1.5} color='gray' />}
        label="Balance"
        to="/ceo/my-balance"
        isActive={location.pathname === '/ceo/my-balance'}
      />
      <DockItem
        icon={<Album size={20} strokeWidth={1.5} color='gray' />}
        label="Bookings"
        to="/ceo/bookings"
        isActive={location.pathname === '/ceo/bookings'}
      />
      <DockItem
        icon={<Droplet size={20} strokeWidth={1.5} color='gray' />}
        label="Services"
        to="/ceo/services"
        isActive={location.pathname === '/ceo/services'}
      />
      <DockItem
        icon={<MessageCircleMore size={20} strokeWidth={1.5} color='gray' />}
        label="Chats"
        to="/ceo"
        isActive={location.pathname === '/settings'}
      />
      <DockItem
        icon={<Mail size={20} strokeWidth={1.5} color='gray' />}
        label="Emails"
        to="/ceo"
        isActive={location.pathname === '/settings'}
      />
      <DockItem
        icon={<Bell size={20} strokeWidth={1.5} color='gray' />}
        label="Notifications"
        to="/ceo"
        isActive={location.pathname === '/settings'}
      />
      <DockItem
        icon={<CircleUserRound size={20} strokeWidth={1.5} color='gray' />}
        label="Profile"
        to="/ceo"
        isActive={location.pathname === '/settings'}
      />
      <DockItem
        icon={<Newspaper size={20} strokeWidth={1.5} color='gray' />}
        label="News"
        to="/ceo"
        isActive={location.pathname === '/settings'}
      />
      <DockItem
        icon={<PowerOff size={20} strokeWidth={1.5} color='gray' />}
        label="Logout"
        to="/ceo"
        isActive={location.pathname === '/settings'}
      />
    </div>
  );
};

export default FloatingDock;