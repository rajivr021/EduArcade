import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const phrases = [
    "Discover fun learning games!",
    "Explore nature's secrets!",
    "Become a science explorer!",
    "Earn cool badges!",
    "Play with friends!"
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed] = useState(100);

  // Floating animation for decorative elements
  const floatingVariants = {
    float: {
      y: ["0%", "10%", "0%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const handleTyping = () => {
      setTypedText((prevText) => {
        if (isDeleting) {
          return currentPhrase.substring(0, prevText.length - 1);
        } else {
          return currentPhrase.substring(0, prevText.length + 1);
        }
      });

      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) =>
          prev === phrases.length - 1 ? 0 : prev + 1
        );
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? typingSpeed / 2 : typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentPhraseIndex]);

  return (
    <section className="hero-section">




      <div className="hero-content">
        <div className="hero-text">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Adventure Awaits in <span className="highlight">Nature's Classroom! </span>

          </motion.h1>

          <motion.div
            className="subtitle-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="subtitle">
              {typedText}
              <span className="cursor">|</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link to="/games" className="cta-button primary">
            <motion.span whileHover={{ scale: 1.05 }}>Start Playing</motion.span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </Link>

          <Link to="/leaderboard" className="cta-button secondary">
            <motion.span whileHover={{ scale: 1.05 }}>See Top Explorers</motion.span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <path d="M16 15V17M12 11V17M8 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
      <div className="HeroImg"><img src="./HeroNewBg.png" alt="" /></div>


     

      {/* Interactive scroll indicator */}
     <Box
  sx={{
    position: 'absolute',
    bottom: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 10
  }}
>
  <motion.div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      gap: '8px',
    }}
    onClick={() => window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' })}
    animate={{
      y: [0, 10, 0]
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {/* Game controller scroll indicator */}
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      {/* D-pad animation */}
      <motion.div
        style={{ 
          position: 'relative',
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(4px)'
        }}
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            fontSize: '2rem',
            color: '#FF6D00'
          }}
          animate={{
            y: [0, -5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ↑
        </motion.div>
       
      </motion.div>

      {/* XP progress bar */}
      <motion.div
        style={{
          width: '100px',
          height: '6px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '3px',
          marginTop: '12px',
          overflow: 'hidden'
        }}
      >
        <motion.div
          style={{
            height: '100%',
            width: '0%',
            background: 'linear-gradient(90deg, #00C853, #64DD17)',
            borderRadius: '3px'
          }}
          animate={{
            width: ['0%', '100%', '0%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>

    {/* Game-style text prompt */}
    <motion.div
      style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '8px 16px',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        border: '2px solid #FF6D00'
      }}
      animate={{
        scale: [1, 1.05, 1],
        borderColor: ['#FF6D00', '#FFAB00', '#FF6D00']
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    >
      <motion.p
        style={{
          color: '#FFFFFF',
          fontWeight: '700',
          fontSize: '14px',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            color: ['#FFF', '#FFD600', '#FFF']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          SCROLL!
        </motion.span>
        <motion.span
          animate={{ 
            x: [0, 5, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
        >
          ▼
        </motion.span>
      </motion.p>
    </motion.div>
  </motion.div>
</Box>
    </section>
  );
};

export default HeroSection;