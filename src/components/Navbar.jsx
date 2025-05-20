import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const handleHover = (item) => setHoveredItem(item);
  const handleLeave = () => setHoveredItem(null);
  const handleLogout = async () => {
    await signOut();
  };

  const navItems = [
    { path: "/", icon: "🏠", name: "Home" },
    { path: "/games", icon: "🎮", name: "Games" },
    { path: "/leaderboard", icon: "🏆", name: "Leaderboard" },
    ...(isSignedIn
      ? [{
          path: "/Profile",
          icon: (
            <div className="avatar-container">
              <img
                src={user?.imageUrl || '/default-avatar.png'}
                alt="User Avatar"
                className="navprofile-avatar"
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
              {hoveredItem === 'Profile' && (
                <div className="avatar-glow" />
              )}
            </div>
          ),
          name: user?.firstName || "Profile",
          isProfile: true,
        }]
      : [{
          path: "/sign-in",
          icon: "🔑",
          name: "Log In",
        }]
    )
  ];

  return (
    <nav className="forest-navbar">
      {/* Logo */}
      <Link
        to="/"
        className="navbar-logo"
        onMouseEnter={() => handleHover('logo')}
        onMouseLeave={handleLeave}
      >
        <div className={`logo-tree ${hoveredItem === 'logo' ? 'swaying' : ''}`}>🌲</div>
        <span className="logo-text">EduArcade</span>
        {hoveredItem === 'logo' && (
          <div className="logo-fireflies">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="firefly"></div>
            ))}
          </div>
        )}
      </Link>

      {/* Mobile Menu Button */}
      <button
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="mushroom">
          <div className="mushroom-cap" />
          <div className="mushroom-spots">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="spot" />
            ))}
          </div>
          <div className="mushroom-stem" />
        </div>
      </button>

      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li
            key={item.name}
            onMouseEnter={() => handleHover(item.name)}
            onMouseLeave={handleLeave}
          >
            <Link
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={hoveredItem === item.name ? "active" : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
              {item.isProfile && <div className="profile-badge" />}
              <div className="leaf-trail" />
            </Link>
          </li>
        ))}

        {isSignedIn && (
          <li>
            <button onClick={handleLogout} className="logout-btn">
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Log Out</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;