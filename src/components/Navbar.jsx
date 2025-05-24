import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import './Navbar.css';
import './Profile.css'

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const handleHover = (item) => setHoveredItem(item);
  const handleLeave = () => setHoveredItem(null);

  const navItems = [
    { path: "/", icon: <img className='nav-img' src='./home.gif' />, name: "", id: 1321 },
    { path: "/games", icon: <img className='nav-img' src='./LB/Games.gif' />, name: "", id: 1121 },
    { path: "/leaderboard", icon: <img className='nav-img' src='./LB/lbNav.gif' />, name: "", id: 1311 },
    ...(isSignedIn
      ? []
      : [{
        path: "/sign-in",
        icon: "🔑",
        name: "Log In",
        id: 1411
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
            key={item.id}
            onMouseEnter={() => handleHover(item.id)}
            onMouseLeave={handleLeave}
          >
            <Link
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={hoveredItem === item.id ? "active" : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
              <div className="leaf-trail" />
            </Link>
          </li>
        ))}
        {isSignedIn && (
          <li className="user-button-li">
            <UserButton
              appearance={{
                elements: {
                  userButtonPopoverRoot: 'user-popover-root',
                  userButtonPopoverCard: 'user-popover-card',
                  userButtonPopoverFooter: 'user-popover-footer',
                  userButtonPopoverActionButton: 'user-popover-action-btn',
                  userPreviewMainIdentifier: 'user-preview-name',
                  userPreviewSecondaryIdentifier: 'user-preview-email',
                  avatarImage: 'user-popover-avatar',
                  userButtonPopoverActionButtonIcon: 'action-btn-icon'
                }
              }}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;