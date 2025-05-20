import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AboutUs from './AboutUs'
import "./Home.css";
import Footer from "./Footer";

const Home = () => {
  const [typedText, setTypedText] = useState("");
  const [activeGame, setActiveGame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample featured games data
  const featuredGames = [
    {
      id: 1,
      name: "Math Adventure",
      category: "Mathematics",
      color: "var(--primary)"
    },
    {
      id: 2,
      name: "Word Explorer",
      category: "Language",
      color: "var(--secondary)"
    },
    {
      id: 3,
      name: "Science Quest",
      category: "Science",
      color: "var(--accent)"
    }
  ];

  const subtitleText = "Learn and Play with Our Collection of Educational Games";

  // Typing effect
  useEffect(() => {
    let index = 0;
    let timeout;

    const typeText = () => {
      if (index <= subtitleText.length) {
        setTypedText(subtitleText.slice(0, index));
        index++;
        timeout = setTimeout(typeText, 50);
      } else {
        timeout = setTimeout(() => {
          setTypedText("");
          index = 0;
          typeText();
        }, 3000);
      }
    };

    typeText();

    return () => clearTimeout(timeout);
  }, []);

  // Game carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveGame((prev) => (prev + 1) % featuredGames.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">Explore Knowledge</span> in Nature's Classroom
            </h1>
            <div className="subtitle-container">
              <p className={`subtitle ${typedText ? "typing" : ""}`}>
                {typedText}
                <span className="cursor">|</span>
              </p>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/games" className="cta-button primary">
              Browse Games
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/leaderboard" className="cta-button secondary">
              View Leaderboard
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 15V17M12 11V17M8 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="hero-image">
          <img src="/WalnutTree.gif"/>
        </div>
      </section>

      {/* Featured Games Preview */}
      <section className="featured-section">
        <h2 className="section-title">Games</h2>
        <div className="games-carousel">
          {featuredGames.map((game, index) => (
            <div 
              key={game.id}
              className={`game-card ${index === activeGame ? "active" : ""} ${isAnimating ? "animating" : ""}`}
              style={{ '--card-color': game.color }}
              onClick={() => setActiveGame(index)}
            >
              <div className="game-content">
                <h3>{game.name}</h3>
                <p>{game.category}</p>
                <Link to={`/game/${game.id}`} className="play-button">
                  Play Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2 className="section-title">Why Choose Our Platform</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Curriculum Aligned</h3>
            <p>Games designed to complement school curricula for effective learning.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.227 15.6363 19.2863 15.9606C19.3456 16.2849 19.5006 16.5814 19.7276 16.8084C19.9546 17.0354 20.2511 17.1904 20.5754 17.2497C20.8997 17.309 21.2344 17.2691 21.536 17.136L21.728 17.044L19.4 15ZM4.60005 15L2.27205 17.044L2.46405 17.136C2.76563 17.2691 3.10034 17.309 3.42464 17.2497C3.74894 17.1904 4.04542 17.0354 4.27242 16.8084C4.49942 16.5814 4.65442 16.2849 4.71372 15.9606C4.77302 15.6363 4.73314 15.3016 4.60005 15V15ZM15 4.6L17.044 2.272L17.136 2.464C17.2691 2.76563 17.309 3.10034 17.2497 3.42464C17.1904 3.74894 17.0354 4.04542 16.8084 4.27242C16.5814 4.49942 16.2849 4.65442 15.9606 4.71372C15.6363 4.77302 15.3016 4.73314 15 4.6V4.6ZM9 4.6C8.69842 4.73314 8.36371 4.77302 8.03941 4.71372C7.71511 4.65442 7.41863 4.49942 7.19163 4.27242C6.96463 4.04542 6.80963 3.74894 6.75033 3.42464C6.69103 3.10034 6.73091 2.76563 6.864 2.464L6.956 2.272L9 4.6ZM12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Interactive Learning</h3>
            <p>Engaging gameplay that makes learning fun and memorable.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 15V17M8 11H16M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.673C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.07989 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Progress Tracking</h3>
            <p>Monitor your child's development with detailed analytics.</p>
          </div>
        </div>
      </section>
          <AboutUs/>
          <Footer/>
     </div>
  );
};

export default Home;