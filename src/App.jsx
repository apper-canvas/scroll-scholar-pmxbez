import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  
  // Initialize theme based on localStorage or default to dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('scrollscholar-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
    
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('scrollscholar-theme', newTheme ? 'dark' : 'light');
    
    // Show theme change toast
    toast.info(`Switched to ${newTheme ? 'dark' : 'light'} mode`, {
      icon: newTheme ? "🌙" : "☀️",
      position: "bottom-center",
      autoClose: 1500,
    });
  };
  
  // Create icon components
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  
  return (
    <div className="min-h-screen transition-colors duration-300">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      
      {/* Theme toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-neu-light dark:shadow-neu-dark bg-white dark:bg-surface-800"
        onClick={toggleTheme}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-surface-600" />}
      </motion.button>

      {/* Toast container with appropriate theme */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="mt-20"
      />
    </div>
  );
}

export default App;