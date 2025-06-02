import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import "./Navbar.css";
import "./Profile.css";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import HiGreeting from "./HiGreeting";

const Navbar = () => {
    const { isSignedIn, user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const [showGreeting, setShowGreeting] = useState(false);
    const [greetingPosition, setGreetingPosition] = useState({ x: 0, y: 0 });

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const handleHover = (item) => setHoveredItem(item);
    const handleLeave = () => setHoveredItem(null);

    // Randomize greeting position on hover
    useEffect(() => {
        if (showGreeting) {
            const randomX = Math.floor(Math.random() * 60) - 30; // -30 to 30
            const randomY = Math.floor(Math.random() * 50) - 25; // -25 to 25
            setGreetingPosition({ x: randomX, y: randomY });
        }
    }, [showGreeting]);

    const navItems = [
        {
            path: "/",
            icon: <img className="nav-img" src="./home.gif" />,
            name: "Home",
            id: 1321,
        },
        {
            path: "/games",
            icon: <img className="nav-img" src="./LB/Games.gif" />,
            name: "Games",
            id: 1121,
        },
        {
            path: "/leaderboard",
            icon: <img className="nav-img" src="./LB/lbNav.gif" />,
            name: "Leaderboard",
            id: 1311,
        },
        ...(isSignedIn
            ? []
            : [
                {
                    path: "/sign-in",
                    icon: "🔑",
                    name: "Log In",
                    id: 1411,
                },
            ]),
    ];

    return (
        <nav className="forest-navbar">
            {/* Logo */}
            <Link
                to="/"
                className="navbar-logo"
                onMouseEnter={() => handleHover("logo")}
                onMouseLeave={handleLeave}
            >
                <div className={`logo-tree ${hoveredItem === "logo" ? "swaying" : ""}`}>
                    <img className="NavLogo" alt="Logo" src="/NavLogo/Mushroom.gif"/>
                </div>
                <span className="logo-text">EduArcade</span>
                {hoveredItem === "logo" && (
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
                        <Tippy
                            content={<span className="tooltip-text">{item.name}</span>}
                            placement="bottom"
                            interactive={true}
                            animation="scale"
                            delay={[0, 100]}
                            theme="forest"
                        >
                            <Link
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={hoveredItem === item.id ? "active" : ""}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text visually-hidden">{item.name}</span>
                                <div className="leaf-trail" />
                            </Link>
                        </Tippy>
                    </li>
                ))}

                {isSignedIn && (
                    <li className="user-button-li">
                        <div
                            className="tooltip-container"
                            onMouseEnter={() => {
                                setShowGreeting(true);
                            }}
                            onMouseLeave={() => setShowGreeting(false)}
                        >
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonPopoverRoot: "user-popover-root",
                                        userButtonPopoverCard: "user-popover-card",
                                        userButtonPopoverFooter: "user-popover-footer",
                                        userButtonPopoverActionButton: "user-popover-action-btn",
                                        userPreviewMainIdentifier: "user-preview-name",
                                        userPreviewSecondaryIdentifier: "user-preview-email",
                                        avatarImage: "user-popover-avatar",
                                        userButtonPopoverActionButtonIcon: "action-btn-icon",
                                    },
                                }}
                            />

                            {showGreeting && (
                                <div
                                    className="greeting-positioner"
                                    style={{
                                        top: '50px', 
                                        left: '-200px'
                                    }}
                                >
                                    <HiGreeting user={user.firstName} />
                                </div>
                            )}
                        </div>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
