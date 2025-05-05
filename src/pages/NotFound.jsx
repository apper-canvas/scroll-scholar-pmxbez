import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const navigate = useNavigate();
  
  // Auto-redirect after 5 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);
  
  // Create icon components
  const BookIcon = getIcon('BookOpen');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const HomeIcon = getIcon('Home');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">
      <motion.div
        className="max-w-md w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="relative w-32 h-32 mx-auto mb-6"
          variants={itemVariants}
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/20 animate-ping-slow"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookIcon className="w-16 h-16 text-primary" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-gradient mb-4"
          variants={itemVariants}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-xl md:text-2xl font-semibold mb-6"
          variants={itemVariants}
        >
          Knowledge Not Found
        </motion.h2>
        
        <motion.p 
          className="text-surface-600 dark:text-surface-300 mb-8"
          variants={itemVariants}
        >
          The article you're looking for has been moved, deleted, or possibly never existed in our knowledge base.
        </motion.p>
        
        <motion.div 
          className="space-y-3 md:space-y-0 md:flex md:space-x-4 justify-center"
          variants={itemVariants}
        >
          <Link 
            to="/"
            className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-xl transition-all w-full md:w-auto"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center space-x-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-200 font-medium py-2 px-4 rounded-xl transition-all w-full md:w-auto"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>
        
        <motion.p 
          className="mt-8 text-sm text-surface-500 dark:text-surface-400"
          variants={itemVariants}
        >
          Redirecting to home in 5 seconds...
        </motion.p>
      </motion.div>
    </div>
  );
}

export default NotFound;