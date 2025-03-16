// Dashboard.jsx
import React from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import Stats from '../../component/Stats/Stats';
import Instructions from '../../component/Instructions/Instructions';
import UploadDocument from '../../component/UploadDocument/UploadDocument';
import DocumentHistory from '../../component/DocumentHistory/DocumentHistory';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <h1 className="dashboard-title">Document Dashboard</h1>
          <Stats />
          <div className="content-grid">
            <Instructions />
            <UploadDocument />
          </div>
          <DocumentHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;