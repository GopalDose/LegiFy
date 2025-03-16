// Sidebar.jsx
import React from 'react';
import { User, Globe, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth token, redirect)
    console.log('Logout clicked');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>LegalAI</h2>
      </div>
      <div className="sidebar-menu">
        <button className="sidebar-item">
          <User size={20} />
          <span>Profile</span>
        </button>
        <button className="sidebar-item">
          <Globe size={20} />
          <span>Language</span>
        </button>
        <button className="sidebar-item">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="sidebar-item logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 