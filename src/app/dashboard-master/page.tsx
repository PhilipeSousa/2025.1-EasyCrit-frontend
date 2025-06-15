'use client';

import React from 'react';
import './app.css';
import { Cinzel } from 'next/font/google';
import MainContent from './MainContent';
import CampaignButtons from './CampaignButtons';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700'],
});

const Page: React.FC = () => {
  return (
    <div className="page-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo-container">
          <img 
            src="/images/logo1.png"
            alt="Logo" 
            className="logo" 
          />
        </div>
      </div>

      {/* MAIN AND TOPBAR */}
      <div className="main-and-topbar">
        <div className="topbar">
          <div className="topbar-left">
            <img 
              src="/images/light-icon.png" 
              alt="Ícone TopBar" 
              className="topbar-icon" 
            />
          </div>

          <div className="topbar-content">
            <h2 className={`${cinzel.className}`}>DASHBOARD DO MESTRE</h2>
          </div>

          {/* SIDEBAR AND ADITIONAL BUTTONS */}
          <div className="topbar-right">
            <button className="logout-button">LOGOUT</button>
            <button className="avatar-button">
              <img 
                src="/images/profile.png" 
                alt="Avatar do Usuário" 
                className="avatar-image" 
              />
            </button>
          </div>
        </div>

        {/* CAMPAIGN BUTTONS */}
        <CampaignButtons />

        {/* MAIN CONTENT */}
        <MainContent />
      </div>
    </div>
  );
};

export default Page;
