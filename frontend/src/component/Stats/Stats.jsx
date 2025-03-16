// Stats.jsx
import React from 'react';
import { FileCheck, Clock, Brain } from 'lucide-react';
import './Stats.css';

const Stats = () => {
  const statsData = [
    { title: "Documents Processed", value: "124", icon: FileCheck, color: "#3b82f6" },
    { title: "Time Saved", value: "83 hrs", icon: Clock, color: "#22c55e" },
    { title: "AI Analyses", value: "268", icon: Brain, color: "#9333ea" },
  ];

  return (
    <div className="stats-grid">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-title">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;