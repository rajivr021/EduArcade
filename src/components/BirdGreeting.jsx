import React, { useState } from "react";
import "./BirdGreeting.css";

const BirdGreeting = ({ user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    setIsHappy(true);
    setTimeout(() => setIsHappy(false), 1000);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getRandomMessage = () => {
    const messages = [
      `Hi ${user}!`,
      `Hello there!`,
      `Nice to see you!`,
      `${user}! ${user}!`,
      `Ribbit!`,
      `Hop to it!`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div 
      className="bird-activator"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div 
        className={`bird-wrapper ${isVisible ? "visible" : ""}`}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <div 
          className={`bird-container ${isHappy ? "happy" : ""}`}
          style={{
            transform: `translate(${position.x / 20}px, ${position.y / 20}px)`
          }}
        >
          <img
            src="/Frog.gif"
            alt="Friendly Frog"
            className={`bird-image ${clickCount > 5 ? "spin" : ""}`}
          />
          {isVisible && (
            <div className="speech-bubble">
              {clickCount > 10 ? "STOP CLICKING ME!" : getRandomMessage()}
              {clickCount > 0 && !isHappy && (
                <div className="click-counter">Clicks: {clickCount}</div>
              )}
            </div>
          )}
        </div>
        {clickCount > 15 && (
          <div className="secret-message">
            Wow, you really like frogs! 🐸
          </div>
        )}
      </div>
    </div>
  );
};

export default BirdGreeting;