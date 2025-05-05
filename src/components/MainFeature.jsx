import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// TypeWriter component for the typing animation effect
const TypeWriter = ({ text, delay = 40, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className={`${className} ${!isComplete ? 'typing-animation' : ''}`}>
      {displayText}
    </div>
  );
};

function MainFeature() {
  return (
    <div className="hidden">
      {/* Placeholder for future main features */}
    </div>
  );
}

export { TypeWriter };
export default MainFeature;