import { useState, useEffect } from "react";
import "./HiGreeting.css";

const HiGreeting = ({ user }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [mood, setMood] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const images = [
    "./sayHi/new/cat.gif",
    "./sayHi/new/cartoon.gif",
    "./sayHi/new/Blob Bat.gif",
    "./sayHi/Frog.gif",
    "./sayHi/new/Cat Say Hello.gif",
    "./sayHi/HiOwl.gif",
    "./sayHi/Monkey.gif",
    "./sayHi/Panda.gif",
    "./sayHi/new/Parrot.gif",
    "./sayHi/new/Parrot1.gif",
    "./sayHi/new/Owl.gif",
    "./sayHi/new/Parrot Listening.gif",
    "./sayHi/new/well mate.gif",
    "./sayHi/new/Parrot Worm.gif",
  ];

  console.log(user.username);
  

  const messages = [
    `👋 Hi, ${user.username}! Ready for fun?`,
    `🌟 You're a superstar, ${user.username}!`,
    `🐸 Ribbit! ${user.username} is hopping by!`,
    `🌈 Magic alert! ${user.username} is here!`,
    `🦸‍♂️ ${user.username}, the super kid!`,
    `🎨 Wow, ${user.username}! Your avatar is awesome!`,
    `🍪 Do you like cookies, ${user.username}?`,
    `🎈 Hover power... BOING!`,
    `🦄 A unicorn whispered: ${user.username} is cool!`,
    `🚀 ${user.username} is blasting off to fun!`,
  ];

  const specialMessages = [
    `✨ ${user.username}, you're magical! ✨`,
    `🎯 BULLSEYE! Perfect click, ${user.username}!`,
    `🏆 Champion clicker alert!`,
    `💎 You found a rare greeting!`,
    `👑 All hail ${user.username}, the click master!`
  ];

  const getRandomGreeting = () => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    let randomMessageIndex = Math.floor(Math.random() * messages.length);
    
    // Determine mood and special status
    const newMood = randomMessageIndex % 3 === 0 ? "happy" : "";
    const newIsSpecial = randomMessageIndex % 5 === 0;
    
    // If it's special, use a special message
    if (newIsSpecial) {
      randomMessageIndex = Math.floor(Math.random() * specialMessages.length);
      return {
        image: images[randomImageIndex],
        message: specialMessages[randomMessageIndex],
        mood: "special",
        isSpecial: true
      };
    }
    
    return {
      image: images[randomImageIndex],
      message: messages[randomMessageIndex],
      mood: newMood,
      isSpecial: false
    };
  };

  useEffect(() => {
    if (user.username) {
      setIsVisible(true);
      const { image, message, mood, isSpecial } = getRandomGreeting();
      setCurrentImage(image);
      setCurrentMessage(message);
      setMood(mood);
      setIsSpecial(isSpecial);
    }
  }, [user.username]);

  useEffect(() => {
    if (clickCount > 15) {
      setShowSecret(true);
      const timer = setTimeout(() => setShowSecret(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleHover = () => {
    const { image, message, mood, isSpecial } = getRandomGreeting();
    setCurrentImage(image);
    setCurrentMessage(message);
    setMood(mood);
    setIsSpecial(isSpecial);
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    handleHover();
  };

  const bubbleClasses = `speech-bubble-3d ${mood} ${isSpecial ? 'special' : ''}`;

  return (
    <div className="greeting-activator">
      <div className="greeting-wrapper">
        <div 
          className={`greeting-container ${mood} ${isSpecial ? 'special' : ''}`}
          onMouseEnter={handleHover}
          onClick={handleClick}
        >
          {currentImage && (
            <img
              src={currentImage}
              alt="Greeting"
              className={`greeting-image ${clickCount > 10 ? 'spin' : ''}`}
            />
          )}
          
          {/* 3D Speech Bubble */}
          {isVisible && (
            <div className={bubbleClasses}>
              <div className="bubble-content-3d">
                {currentMessage || `Hello, ${user.username}!`}
                {isSpecial && <span className="fireworks-3d">🎉</span>}
              </div>
              {clickCount > 0 && (
                <div className="counter-container-3d">
                  <span className="click-counter-3d">
                    Clicks: {clickCount}
                  </span>
                </div>
              )}
            </div>
          )}
          
          {/* Secret message appears after many clicks */}
          {showSecret && (
            <div className="secret-message">
              Wow! You really like clicking! 🎊
              <div className="fireworks">✨🎆✨</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HiGreeting;