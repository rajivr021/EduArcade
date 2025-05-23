import React, { useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('project');
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <section className="about-detailed">
      <div className="detailed-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1 className="hero-title">Welcome to <span>Fun Game World</span></h1>
          <p className="hero-subtitle">Where Innovation Meets Entertainment</p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="statlabel">Games Developed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5M+</div>
              <div className="statlabel">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="statlabel">Team Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12</div>
              <div className="statlabel">Countries Served</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="about-tabs">
          <button 
            className={`tab-btn ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => setActiveTab('project')}
          >
            Our Flagship Project
          </button>
          <button 
            className={`tab-btn ${activeTab === 'org' ? 'active' : ''}`}
            onClick={() => setActiveTab('org')}
          >
            Our Organization
          </button>
          <button 
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Our Services
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'project' && (
            <div className="project-details">
              <h2>Fun Game World Platform</h2>
              <div className="project-highlights">
                <div className="highlight-card">
                  <div className="highlight-icon">🌐</div>
                  <h3>Cross-Platform</h3>
                  <p>Play seamlessly across web, mobile, and desktop devices with synchronized progress</p>
                </div>
                <div className="highlight-card">
                  <div className="highlight-icon">👥</div>
                  <h3>Multiplayer Focus</h3>
                  <p>Real-time multiplayer functionality with matchmaking and tournaments</p>
                </div>
                <div className="highlight-card">
                  <div className="highlight-icon">🔐</div>
                  <h3>Secure Ecosystem</h3>
                  <p>Blockchain-based ownership for in-game assets and achievements</p>
                </div>
              </div>
              
              <div className="project-features">
                <h3>Key Features</h3>
                <ul className="features-list">
                  <li>Daily challenges and seasonal events</li>
                  <li>Player customization and avatar system</li>
                  <li>Integrated streaming capabilities</li>
                  <li>Parental controls and playtime management</li>
                  <li>Localization in 15 languages</li>
                </ul>
                
                <div className="tech-stack">
                  <h4>Technology Stack</h4>
                  <div className="tech-badges">
                    <span className="tech-badge">React</span>
                    <span className="tech-badge">Node.js</span>
                    <span className="tech-badge">WebGL</span>
                    <span className="tech-badge">MongoDB</span>
                    <span className="tech-badge">AWS</span>
                    <span className="tech-badge">Unity</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'org' && (
            <div className="org-details">
              <div className="org-history">
                <h2>Our Story</h2>
                <p>
                  Founded in 2020 by gaming industry veterans, Fun Game World started as a small indie studio 
                  with a passion for creating engaging browser-based games. Today, we've grown into a full-fledged 
                  game development company with offices in 3 countries.
                </p>
                
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-year">2020</div>
                    <div className="timeline-content">
                      <h4>Company Founded</h4>
                      <p>Launched with our first HTML5 puzzle game</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-year">2021</div>
                    <div className="timeline-content">
                      <h4>Series A Funding</h4>
                      <p>Raised $5M to expand our development team</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-year">2022</div>
                    <div className="timeline-content">
                      <h4>Platform Launch</h4>
                      <p>Released the unified Fun Game World platform</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-year">2023</div>
                    <div className="timeline-content">
                      <h4>International Expansion</h4>
                      <p>Opened offices in Berlin and Tokyo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="team-section">
                <h2>Leadership Team</h2>
                <div className="team-grid">
                  <div className="team-member">
                    <div className="member-photo placeholder-photo"></div>
                    <h3>Alex Johnson</h3>
                    <p className="member-role">CEO & Founder</p>
                    <p className="member-bio">Former lead designer at Major Game Studio with 15 years experience</p>
                  </div>
                  <div className="team-member">
                    <div className="member-photo placeholder-photo"></div>
                    <h3>Maria Chen</h3>
                    <p className="member-role">CTO</p>
                    <p className="member-bio">Specialist in scalable game architectures and cloud infrastructure</p>
                  </div>
                  <div className="team-member">
                    <div className="member-photo placeholder-photo"></div>
                    <h3>James Wilson</h3>
                    <p className="member-role">Creative Director</p>
                    <p className="member-bio">Award-winning game designer with focus on player engagement</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-details">
              <h2>Our Comprehensive Services</h2>
              
              <div className="service-categories">
                <div 
                  className={`service-category ${expandedService === 0 ? 'expanded' : ''}`}
                  onClick={() => toggleService(0)}
                >
                  <div className="service-header">
                    <h3>Game Development</h3>
                    <span className="toggle-icon">{expandedService === 0 ? '−' : '+'}</span>
                  </div>
                  {expandedService === 0 && (
                    <div className="service-content">
                      <ul>
                        <li><strong>Custom Game Development:</strong> From concept to launch, we build games tailored to your specifications</li>
                        <li><strong>HTML5 Games:</strong> Lightweight, browser-based games with no downloads required</li>
                        <li><strong>Mobile Games:</strong> iOS and Android development with cross-platform support</li>
                        <li><strong>Unity/Unreal Development:</strong> High-quality 3D games for all platforms</li>
                        <li><strong>Game Porting:</strong> Migrate existing games to new platforms</li>
                      </ul>
                      <div className="service-examples">
                        <h4>Recent Projects:</h4>
                        <p>"Space Adventurers" - Multiplayer space exploration game with 500K MAU</p>
                        <p>"Puzzle Kingdom" - Educational puzzle series for children</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`service-category ${expandedService === 1 ? 'expanded' : ''}`}
                  onClick={() => toggleService(1)}
                >
                  <div className="service-header">
                    <h3>Gaming Platforms</h3>
                    <span className="toggle-icon">{expandedService === 1 ? '−' : '+'}</span>
                  </div>
                  {expandedService === 1 && (
                    <div className="service-content">
                      <ul>
                        <li><strong>White-label Platforms:</strong> Customizable gaming portals with your branding</li>
                        <li><strong>Subscription Systems:</strong> Recurring revenue models with member benefits</li>
                        <li><strong>Tournament Systems:</strong> Automated competition frameworks with prizes</li>
                        <li><strong>Player Analytics:</strong> Detailed dashboards tracking user behavior</li>
                        <li><strong>Payment Integration:</strong> Global payment solutions with fraud protection</li>
                      </ul>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`service-category ${expandedService === 2 ? 'expanded' : ''}`}
                  onClick={() => toggleService(2)}
                >
                  <div className="service-header">
                    <h3>Consulting & Strategy</h3>
                    <span className="toggle-icon">{expandedService === 2 ? '−' : '+'}</span>
                  </div>
                  {expandedService === 2 && (
                    <div className="service-content">
                      <ul>
                        <li><strong>Game Design Documentation:</strong> Comprehensive GDD creation</li>
                        <li><strong>Monetization Strategy:</strong> Optimizing revenue through IAP, ads, and subscriptions</li>
                        <li><strong>Player Retention Analysis:</strong> Reducing churn through data-driven insights</li>
                        <li><strong>Technical Audits:</strong> Performance optimization and security reviews</li>
                        <li><strong>Market Research:</strong> Competitive analysis and trend forecasting</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="client-logos">
                <h3>Trusted By Industry Leaders</h3>
                <div className="logos-grid">
                  <div className="logo-item">Client 1</div>
                  <div className="logo-item">Client 2</div>
                  <div className="logo-item">Client 3</div>
                  <div className="logo-item">Client 4</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;