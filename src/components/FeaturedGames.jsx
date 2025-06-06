import React, { useState, useEffect, useRef } from 'react';
import './FeaturedGames.css';

const FeaturedGames = ({ games = [] }) => {
  const topGames = [...games]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const slideInterval = useRef(null);
  const [hover, setHover] = useState(false);

  // Calculate the maximum index based on showing 3 cards at a time
  const maxIndex = Math.max(0, topGames.length - 3);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    if (index >= 0 && index <= maxIndex) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(slideInterval.current);
  }, [maxIndex]);

  // Touch Events
  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    clearInterval(slideInterval.current);
  };

  const handleTouchEnd = (e) => {
    if (!isDraggingRef.current) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startXRef.current - endX;

    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();

    isDraggingRef.current = false;
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  return (
    <section className="feat-games-carousel">
      <h2 className="feat-games-title">Trending & Highly Rated Games</h2>
      <div
        className="carousel-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-track"
          ref={trackRef}
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {topGames.map((game, index) => {
            const isActive = index === currentIndex + 1; // Center card is active
            const isVisible = index >= currentIndex && index < currentIndex + 3;

            return (
              <div
                className={`carousel-slide ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
                key={game.id}
                style={{ width: `${100 / 3}%` }}
              >
                <div className="game-card">
                  <div className="game-banner-container">
                    {game.isNew && <div class="cloud-badge">
                      NEW!
                      <div class="face">
                        <div class="eye left"></div>
                        <div class="eye right"></div>
                        <div class="mouth"></div>
                      </div>
                      <div class="sunbeam"></div>
                    </div>}
                    <img
                      src={game.banner}
                      alt={game.title}
                      className="game-banner"
                    />
                    <div className="game-tags">
                    </div>
                    <div className="game-overlay" />
                  </div>
                  <div className="game-content">
                    <h3 className="game-title">{game.title}</h3>
                    <div className="game-meta">
                      <div className="game-rating">
                        ⭐ <span>{game.rating?.toFixed(1) || '4.0'}</span>
                      </div>
                      <div className="holographic-container">
                        <button
                          className="holographic-btn"
                          onClick={() => window.open(game.url, '_blank')}
                          aria-label="Play Game"
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                        >
                          <div className="holographic-base">
                            <div className="holographic-ring holographic-ring-1"></div>
                            <div className="holographic-ring holographic-ring-2"></div>
                            <div className="holographic-core">
                              <span className="holographic-icon">▶</span>
                            </div>
                            {hover && <div className="holographic-particles"></div>}
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots - only show if there's more than 3 games */}
        {topGames.length > 3 && (
          <div className="carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentIndex === index ? 'active' : ''
                  }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}

        {/* Arrows - only show if there's more than 3 games */}
        {topGames.length > 3 && (
          <>
            <button className="carousel-arrow left" onClick={prevSlide}>‹</button>
            <button className="carousel-arrow right" onClick={nextSlide}>›</button>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedGames;