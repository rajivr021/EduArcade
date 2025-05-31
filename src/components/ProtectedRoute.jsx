// components/ProtectedRoute.jsx
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProtectedRoute.css';

const LoadingAnimation = () => {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

  return (
    <div className="loading-container">
      <div className="loading-content">
        <motion.div
          className="loading-logo"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 100 100" className="logo-svg">
            <path
              d="M50 10 L75 40 L65 70 L35 70 L25 40 Z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <h2 className="loading-text">Loading Fun and Games Just for You!</h2>

        <div className="loading-dots">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              className="dot"
              style={{ backgroundColor: color }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.1,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="progress-track">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>

        <p className="loading-subtext">Gears are turning and magic is happening... Almost there!</p>
      </div>

      <div className="loading-background">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-particle"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <LoadingAnimation />;

  return isSignedIn ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;