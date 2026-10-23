import React from 'react';
import './Header.css';

export interface HeaderProps {
  activeTab?: 'arena' | 'practice' | 'leaderboards';
  onTabChange?: (tab: 'arena' | 'practice' | 'leaderboards') => void;
  isOfflineReady?: boolean;
  username?: string;
  avatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab = 'arena',
  onTabChange,
  isOfflineReady = true,
  username = 'DevRunner',
  avatarUrl,
}) => {
  return (
    <header className="header-container">
      {/* Brand Logo & Title */}
      <div className="header-brand">
        <div className="brand-icon-wrapper">
          <svg
            className="brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>
        <h1 className="brand-title">SyntaxSprint</h1>
      </div>

      {/* Navigation Tabs */}
      <nav className="header-nav">
        <button
          className={`nav-tab ${activeTab === 'arena' ? 'active' : ''}`}
          onClick={() => onTabChange?.('arena')}
        >
          Sprint Arena
        </button>
        <button
          className={`nav-tab ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => onTabChange?.('practice')}
        >
          Practice Lab
        </button>
        <button
          className={`nav-tab ${activeTab === 'leaderboards' ? 'active' : ''}`}
          onClick={() => onTabChange?.('leaderboards')}
        >
          Leaderboards
        </button>
      </nav>

      {/* Connectivity & User Status */}
      <div className="header-actions">
        {/* PWA Status Badge */}
        <div className={`pwa-status-pill ${isOfflineReady ? 'ready' : ''}`}>
          <span className="status-dot" />
          <span className="status-text">
            {isOfflineReady ? 'PWA: Offline Ready' : 'Connecting...'}
          </span>
        </div>

        {/* Profile Avatar */}
        <div className="user-profile">
          <div className="avatar-frame">
            {avatarUrl ? (
              <img src={avatarUrl} alt={username} className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">{username.charAt(0).toUpperCase()}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;