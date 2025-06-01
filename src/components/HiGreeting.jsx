import React, { useState } from "react";
import "./HiGreeting.css";

const HiGreeting = ({ user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentFrog, setCurrentFrog] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");

  const frogImages = [
    "./sayHi/Bee.gif",
    "./sayHi/bird.gif",
    "./sayHi/BirdFlying.gif",
    "./sayHi/Frog.gif",
    "./sayHi/Geolocation.gif",
    "./sayHi/HiOwl.gif",
    "./sayHi/Monkey.gif",
    "./sayHi/Panda.gif",
    "./sayHi/Parrot.gif",
  ];

  const messages = [
    `👋 Hi, ${user}! Ready for fun?`,
    `🌟 You're a superstar, ${user}!`,
    `🐸 Ribbit! ${user} is hopping by!`,
    `🌈 Magic alert! ${user} is here!`,
    `🦸‍♂️ ${user}, the super kid!`,
    `🎨 Wow, ${user}! Your avatar is awesome!`,
    `🍪 Do you like cookies, ${user}?`,
    `🎈 Hover power... BOING!`,
    `🦄 A unicorn whispered: ${user} is cool!`,
    `🚀 ${user} is blasting off to fun!`,
    `🎮 Press START to play with ${user}!`,
    `🧸 ${user}'s teddy bear approves!`,
    `🎵 La-la-la! ${user} is here to sing!`,
    `🦕 Roar! ${user} is dino-mite!`,
    `🍭 Sweet! You found ${user}!`,
  ];

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setIsHappy(true);

    if (newCount > 10) {
      setCurrentFrog(6); // Angry frog
    } else if (newCount > 5) {
      setCurrentFrog(4); // Special frog
    } else {
      setCurrentFrog(7); // Happy frog
    }

    setTimeout(() => {
      setIsHappy(false);
      if (newCount <= 10) {
        setCurrentFrog(isVisible ? 1 : 0); // back to smile or default
      }
    }, 1000);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    if (clickCount <= 10) {
      if (x > rect.width * 0.6) {
        setCurrentFrog(3);
      } else if (x < rect.width * 0.4) {
        setCurrentFrog(isVisible ? 1 : 0);
      } else {
        setCurrentFrog(2);
      }
    }
  };

  const getCurrentFrogImage = () => {
    return frogImages[currentFrog] || frogImages[0];
  };

  return (
    <div
      className="frog-activator"

      onMouseEnter={() => {
        setIsVisible(true);

        // 🐸 Show a random frog image (avoid angry/happy ones if not clicked much)
        if (clickCount <= 10) {
          const randomFrogIndex = Math.floor(Math.random() * 5); // 0 to 4 are safe
          setCurrentFrog(randomFrogIndex);
        }

        // 💬 Show a random message
        const newMessage = messages[Math.floor(Math.random() * messages.length)];
        setCurrentMessage(newMessage);
      }}

      onMouseLeave={() => {
        setIsVisible(false);
        if (clickCount <= 10) setCurrentFrog(0);
      }}
    >
      <div
        className={`frog-wrapper ${isVisible ? "visible" : ""}`}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <div
          className={`frog-container ${isHappy ? "happy" : ""} ${clickCount > 5 ? "special" : ""
            }`}
          style={{
            transform: `translate(${position.x / 20}px, ${position.y / 20}px)`,
          }}
        >
          <img
            src={getCurrentFrogImage()}
            alt="Friendly Frog"
            className={`frog-image ${clickCount > 5 ? "spin" : ""}`}
          />
          {isVisible && (
            <div className="speech-bubble">
              {clickCount > 10 ? "STOP CLICKING ME!" : currentMessage}
              {clickCount > 0 && !isHappy && (
                <div className="click-counter">Clicks: {clickCount}</div>
              )}
            </div>
          )}
        </div>
        {clickCount > 15 && (
          <div className="secret-message">
            Wow, you really like frogs! 🐸
            <div className="fireworks">🎆</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HiGreeting;
