import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature, { TypeWriter } from '../components/MainFeature';

// Mock data for articles
const mockArticles = [
  {
    id: '1',
    title: 'The History of Computing',
    excerpt: 'From early mechanical calculators to modern supercomputers, how computing evolved over centuries.',
    categories: ['Technology', 'History', 'Science'],
    readingTime: 3,
    viewCount: 12432,
    editCount: 347,
    quality: 4.8,
    thumbnailUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    citations: 45
  },
  {
    id: '2',
    title: 'Deep Ocean Ecosystems',
    excerpt: 'Exploring the mysterious world of deep sea creatures and their unique adaptations.',
    categories: ['Biology', 'Ocean', 'Ecology'],
    readingTime: 4,
    viewCount: 8765,
    editCount: 206,
    quality: 4.5,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    citations: 32
  },
  {
    id: '3',
    title: 'Renaissance Art Movement',
    excerpt: 'The cultural and artistic rebirth across Europe from the 14th to 17th centuries.',
    categories: ['Art', 'History', 'Culture'],
    readingTime: 5,
    viewCount: 10932,
    editCount: 289,
    quality: 4.9,
    thumbnailUrl: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    citations: 58
  }
];

function Home() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [articles, setArticles] = useState([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  
  useEffect(() => {
    // Simulate loading articles
    const loadArticles = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setArticles(mockArticles);
        toast.success("Articles loaded successfully!", {
          icon: "📚",
          position: "bottom-center",
          autoClose: 1500
        });
      }, 800);
    };
    
    loadArticles();
  }, []);
  
  // Create icon components
  const Flame = getIcon('Flame');
  const Users = getIcon('Users');
  const History = getIcon('History');
  const Shuffle = getIcon('Shuffle');
  const HeartIcon = getIcon('Heart');
  const BookmarkIcon = getIcon('Bookmark');
  const ShareIcon = getIcon('Share2');
  const EditIcon = getIcon('Edit2');
  const FileTextIcon = getIcon('FileText');
  const Star = getIcon('Star');
  
  // Handle swipe to next article
  const handleSwipeUp = () => {
    if (currentArticleIndex < articles.length - 1) {
      setCurrentArticleIndex(prevIndex => prevIndex + 1);
    } else {
      // Loop back to the first article
      setCurrentArticleIndex(0);
      toast.info("You've seen all articles! Starting over.", {
        icon: "🔄",
        position: "bottom-center",
        autoClose: 1500
      });
    }
  };
  
  // Handle bookmark action
  const handleBookmark = (e, article) => {
    e.stopPropagation(); // Prevent triggering swipe
    toast.success(`Added "${article.title}" to your reading list`, {
      icon: "🔖",
      position: "bottom-center",
      autoClose: 1500
    });
  };
  
  // Handle follow action
  const handleFollow = (e, category) => {
    e.stopPropagation(); // Prevent triggering swipe
    toast.success(`Now following "${category}"`, {
      icon: "✅",
      position: "bottom-center",
      autoClose: 1500
    });
  };
  
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">
      {/* Navigation header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-2xl font-bold text-gradient"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ScrollScholar
            </motion.h1>
            
            <motion.div
              className="tabs flex space-x-1 bg-surface-200/50 dark:bg-surface-700/50 p-1 rounded-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <button 
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'for-you' 
                    ? 'bg-white dark:bg-surface-600 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-300 hover:bg-white/50 dark:hover:bg-surface-600/50'
                }`}
                onClick={() => setActiveTab('for-you')}
              >
                <Flame className="h-4 w-4 mr-1.5" />
                For You
              </button>
              <button 
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'following' 
                    ? 'bg-white dark:bg-surface-600 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-300 hover:bg-white/50 dark:hover:bg-surface-600/50'
                }`}
                onClick={() => setActiveTab('following')}
              >
                <Users className="h-4 w-4 mr-1.5" />
                Following
              </button>
              <button 
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'history' 
                    ? 'bg-white dark:bg-surface-600 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-300 hover:bg-white/50 dark:hover:bg-surface-600/50'
                }`}
                onClick={() => setActiveTab('history')}
              >
                <History className="h-4 w-4 mr-1.5" />
                History
              </button>
              <button 
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'random' 
                    ? 'bg-white dark:bg-surface-600 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-300 hover:bg-white/50 dark:hover:bg-surface-600/50'
                }`}
                onClick={() => {
                  setActiveTab('random');
                  // Pick a random article
                  const randomIndex = Math.floor(Math.random() * articles.length);
                  setCurrentArticleIndex(randomIndex);
                  toast.info("Knowledge Roulette activated!", {
                    icon: "🎲",
                    position: "bottom-center",
                    autoClose: 1500
                  });
                }}
              >
                <Shuffle className="h-4 w-4 mr-1.5" />
                Random
              </button>
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Main content - Articles */}
      <main className="pt-16 min-h-screen">
        {articles.length > 0 ? (
          <div className="h-[calc(100vh-4rem)]">
            <article 
              className="relative h-full w-full overflow-hidden"
              onClick={handleSwipeUp}
            >
              {/* Article background with Ken Burns effect */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <img 
                  src={articles[currentArticleIndex].thumbnailUrl}
                  alt={articles[currentArticleIndex].title}
                  className="w-full h-full object-cover ken-burns"
                />
              </div>
              
              {/* Left sidebar */}
              <div className="absolute left-4 sm:left-8 md:left-12 bottom-1/3 z-10 flex flex-col items-center space-y-4">
                {/* Topic hashtags */}
                <div className="flex flex-col space-y-2">
                  {articles[currentArticleIndex].categories.map((category, idx) => (
                    <motion.button
                      key={idx}
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 px-3 py-1.5 rounded-full text-white text-shadow text-xs font-medium transition-all"
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => handleFollow(e, category)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      #{category}
                    </motion.button>
                  ))}
                </div>
                
                {/* Related articles */}
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-white text-shadow text-xs font-medium">Related</span>
                  <div className="flex flex-col space-y-1">
                    {[1, 2, 3].map((i) => (
                      <motion.div 
                        key={i}
                        className="w-10 h-10 rounded-full bg-surface-200 border-2 border-white overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <img 
                          src={`https://images.unsplash.com/photo-152962288675${i}-cd18526cda${i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80`}
                          alt="Related article"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Sources used */}
                <div className="text-white text-shadow text-xs font-medium text-center">
                  <div className="mb-1">Sources</div>
                  <motion.div 
                    className="bg-white/10 backdrop-blur-md px-2 py-1 rounded-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {articles[currentArticleIndex].citations} citations
                  </motion.div>
                </div>
              </div>
              
              {/* Right sidebar icons */}
              <div className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center space-y-6">
                <motion.button 
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={(e) => handleFollow(e, articles[currentArticleIndex].categories[0])}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-shadow text-xs mt-1">Follow</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => handleBookmark(e, articles[currentArticleIndex])}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                    <BookmarkIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-shadow text-xs mt-1">Save</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info("Share functionality coming soon!", {
                      icon: "🔗",
                      position: "bottom-center"
                    });
                  }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                    <ShareIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-shadow text-xs mt-1">Share</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info("Edit functionality coming soon!", {
                      icon: "✏️",
                      position: "bottom-center"
                    });
                  }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                    <EditIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-shadow text-xs mt-1">Edit</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info("References panel coming soon!", {
                      icon: "📚",
                      position: "bottom-center"
                    });
                  }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                    <FileTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-shadow text-xs mt-1">Refs</span>
                </motion.button>
              </div>
              
              {/* Article content - CENTERED IN MIDDLE OF SCREEN */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 p-6 sm:p-8 md:p-12">
                <motion.div
                  className="max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-shadow mb-4 text-center">
                    {articles[currentArticleIndex].title}
                  </h2>
                  
                  <div className="text-base sm:text-lg text-white text-shadow mb-6 text-center overflow-hidden">
                    <TypeWriter 
                      text={articles[currentArticleIndex].excerpt}
                      delay={30}
                      className="inline-block max-w-xl mx-auto"
                    />
                  </div>
                  
                  {/* Status bar */}
                  <div className="flex items-center justify-center text-white text-shadow text-sm mt-8">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="mr-1">{articles[currentArticleIndex].viewCount.toLocaleString()}</span>
                        <span>scholars</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-1">{articles[currentArticleIndex].readingTime}</span>
                        <span>min read</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-1">{articles[currentArticleIndex].editCount}</span>
                        <span>edits</span>
                      </div>
                      
                      <div className="flex items-center ml-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(articles[currentArticleIndex].quality) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-surface-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Swipe indicator */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 bottom-24 z-10 text-white text-xs flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ 
                  y: { repeat: Infinity, duration: 2 },
                  opacity: { delay: 1, duration: 0.5 }
                }}
              >
                <span className="mb-1">Swipe up for next article</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </motion.div>
            </article>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-16 h-16 border-t-4 border-primary rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-medium">Loading knowledge...</h2>
              <p className="text-surface-500 dark:text-surface-400 mt-2">Preparing your educational experience</p>
            </motion.div>
          </div>
        )}
      </main>
      
      {/* Main Feature Component */}
      <MainFeature />
    </div>
  );
}

export default Home;