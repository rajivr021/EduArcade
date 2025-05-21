import React, { useState } from 'react';
import './Footer.css';
import {Link} from'react-router-dom'

// Import icons from react-icons library
import {
    FaPhone,
    FaWhatsapp,
    FaGithub,
    FaEnvelope,
    FaMicrosoft,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';

const Footer = () => {
    const [expandedSection, setExpandedSection] = useState(null);
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const contactMethods = [
        { icon: <FaPhone className="contact-icon phone" />, name: 'Call', details: '+91 7903427452' },
        { icon: <FaWhatsapp className="contact-icon whatsapp" />, name: 'WhatsApp', details: '+91 7903427452' },
        { icon: <FaGithub className="contact-icon github" />, name: 'GitHub', details: 'https://github.com/rajivr021' },
        { icon: <FaEnvelope className="contact-icon gmail" />, name: 'Gmail', details: 'rajivr021@gmail.com' },
        { icon: <FaMicrosoft className="contact-icon teams" />, name: 'Microsoft Teams', details: 'rajivkr@ratnasagar.com' },
        { icon: <FaEnvelope className="contact-icon zoho" />, name: 'Zimbra Mail', details: 'rajivkr@ratnasagar.com' }
    ];

    return (
        <footer className="modern-footer">
            {/* Top Section */}
            <div className="footer-top">
                {/* Avatar & Personal Info */}
                <div
                    className="profile-card"
                    onMouseEnter={() => setIsAvatarHovered(true)}
                    onMouseLeave={() => setIsAvatarHovered(false)}
                >
                    <div className={`avatarcontainer ${isAvatarHovered ? 'hovered' : ''}`}>
                        <div className="avatar-circle">
                            <div className="avatarimage"><img src='/footerProfileImg.jpg'/></div>
                            {isAvatarHovered && (
                                <div className="avatar-hover-content">
                                </div>
                            )}
                        </div>
                        <div className="status-dot"></div>
                    </div>
                    <div className="profile-Info">
                        <h3 className="profile-Name">Rajiv Kumar Developer</h3>
                        <p className="profile-Title">Full Stack Developer</p>
                        <p className="profile-Education">MCA Computer Science - Lingaya's Vidyapeeth</p>
                        <p className="profile-Company">Ratna Sagar P Ltd</p>
                    </div>
                </div>

                {/* Quick Contact */}
                <div className="quick-contact">
                    <h4 className="footer-heading">Connect With Me</h4>
                    <div className="social-buttons">
                        {contactMethods.slice(0, 4).map((method, index) => (
                            <Link
                                key={index}
                                href="#"
                                className={`social-button ${method.name.toLowerCase()}`}
                                aria-label={method.name}
                            >
                                {method.icon}
                                <span className="tooltip">{method.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Middle Section - Expandable Sections */}
            <div className="footer-middle">
                {/* Contact Details Section */}



                {/* Professional Details Section */}
                <div className={`footer-section ${expandedSection === 'professional' ? 'expanded' : ''}`}>
                    <div className="section-header" onClick={() => toggleSection('professional')}>
                        <h4>Professional Details</h4>
                        {expandedSection === 'professional' ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {expandedSection === 'professional' && (
                        <div className="section-content">
                            <div className="details-grid">
                                <div className="detail-item">
                                    <h5>Current Position</h5>
                                    <p>Developer at Ratna Sagar P Ltd</p>
                                </div>
                                <div className="detail-item">
                                    <h5>Specialization</h5>
                                    <p>JavaScript, ReactJS, Node.js</p>
                                </div>
                                <div className="detail-item">
                                    <h5>Experience</h5>
                                    <p>3+ years in web development</p>
                                </div>
                                <div className="detail-item">
                                    <h5>Certifications</h5>
                                    <p>Data Structures and Algorithms</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Links Section */}
                <div className={`footer-section ${expandedSection === 'links' ? 'expanded' : ''}`}>
                    <div className="section-header" onClick={() => toggleSection('links')}>
                        <h4>Quick Links</h4>
                        {expandedSection === 'links' ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {expandedSection === 'links' && (
                        <div className="section-content">
                            <div className="links-grid">
                                <Link to="https://rajivr021.netlify.app/" className="footer-link" target="_blank" rel="noopener noreferrer">Portfolio</Link>
                                <Link to="https://github.com/rajivr021?tab=repositories" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub Repos</Link>
                                <Link to="#" className="footer-link" target="_blank" rel="noopener noreferrer">Projects</Link>
                                <Link to="https://drive.google.com/file/d/1L9N192HrRdyKCpoyepimxJ2Pfs0miq8j/view?usp=sharing" className="footer-link" target="_blank" rel="noopener noreferrer">Resume</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <div className="copyright">
                    © {new Date().getFullYear()} Rajiv Kumar Developer. All rights reserved.
                </div>
                <div className="legal-links">
                    <Link to="#" className="legal-link">Privacy Policy</Link>
                    <Link to="#" className="legal-link">Terms of Service</Link>
                    <Link to="#" className="legal-link">Cookies</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;