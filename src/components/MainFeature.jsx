import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Sample topics for the topic suggestions
const TOPICS = [
  "Ancient Civilizations",
  "Quantum Physics",
  "Marine Biology",
  "Renaissance Art",
  "Space Exploration",
  "Artificial Intelligence",
  "World War II",
  "Climate Change",
  "Human Anatomy",
  "Classical Music",
  "Modern Philosophy",
  "Cryptocurrency",
  "Endangered Species",
  "Automotive Engineering",
  "French Revolution"
];

function MainFeature() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const modalRef = useRef(null);
  
  // Create icon components
  const CompassIcon = getIcon('Compass');
  const SearchIcon = getIcon('Search');
  const XIcon = getIcon('X');
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const BrainIcon = getIcon('Brain');
  const BookmarkIcon = getIcon('Bookmark');
  const RefreshCwIcon = getIcon('RefreshCw');
  
  // Filter topics based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTopics(TOPICS);
    } else {
      const filtered = TOPICS.filter(topic => 
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTopics(filtered);
    }
  }, [searchQuery]);
  
  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Handle topic selection/deselection
  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      if (selectedTopics.length < 5) {
        setSelectedTopics([...selectedTopics, topic]);
      } else {
        toast.warning("You can select up to 5 topics", {
          position: "bottom-center",
          autoClose: 2000
        });
      }
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic", {
        position: "bottom-center",
        autoClose: 2000
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
      
      // Show success message
      toast.success("Your knowledge preferences have been saved!", {
        position: "bottom-center",
        autoClose: 3000
      });
      
      // Close modal after delay
      setTimeout(() => {
        setIsOpen(false);
        
        // Reset form after closing
        setTimeout(() => {
          setHasSubmitted(false);
          setSelectedTopics([]);
        }, 300);
      }, 1500);
    }, 1500);
  };
  
  // Reset form
  const resetForm = () => {
    setSelectedTopics([]);
    setSearchQuery('');
    toast.info("Preferences reset", {
      position: "bottom-center",
      autoClose: 1500
    });
  };
  
  return (
    <>
      {/* Feature trigger button */}
      <motion.button
        className="fixed left-6 bottom-6 z-40 flex items-center justify-center bg-gradient-to-br from-secondary to-primary text-white rounded-full p-3 shadow-lg"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <CompassIcon className="w-6 h-6" />
      </motion.button>
      
      {/* Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal content */}
            <motion.div
              ref={modalRef}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-xl font-bold flex items-center">
                  <BrainIcon className="w-5 h-5 mr-2 text-primary" />
                  Knowledge Explorer
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                >
                  <XIcon className="w-5 h-5 text-surface-500 dark:text-surface-400" />
                </button>
              </div>
              
              {hasSubmitted ? (
                // Success state
                <div className="p-8 flex flex-col items-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 10 
                    }}
                  >
                    <CheckIcon className="w-10 h-10 text-secondary" />
                  </motion.div>
                  
                  <motion.h4
                    className="text-xl font-bold mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Preferences Saved!
                  </motion.h4>
                  
                  <motion.p
                    className="text-surface-600 dark:text-surface-300 text-center mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Your article feed will now be personalized based on your interests.
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {selectedTopics.map((topic, index) => (
                      <span 
                        key={topic}
                        className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </motion.div>
                </div>
              ) : (
                // Form state
                <form onSubmit={handleSubmit}>
                  <div className="p-5">
                    <p className="text-surface-600 dark:text-surface-300 mb-5">
                      Select topics you're interested in to personalize your knowledge feed. You can select up to 5 topics.
                    </p>
                    
                    {/* Search input */}
                    <div className="relative mb-5">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-surface-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search topics..."
                        className="w-full pl-10 py-2.5 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <XIcon className="w-4 h-4 text-surface-400 hover:text-surface-600" />
                        </button>
                      )}
                    </div>
                    
                    {/* Selected topics */}
                    {selectedTopics.length > 0 && (
                      <div className="mb-5">
                        <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-2">
                          Selected Topics ({selectedTopics.length}/5)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTopics.map(topic => (
                            <div
                              key={topic}
                              className="group bg-secondary/10 rounded-full pl-3 pr-2 py-1 flex items-center text-sm text-secondary font-medium"
                            >
                              <span>{topic}</span>
                              <button
                                type="button"
                                onClick={() => toggleTopic(topic)}
                                className="ml-1 rounded-full p-0.5 hover:bg-secondary/20 transition-colors"
                              >
                                <XIcon className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Topic list */}
                    <div className="h-60 overflow-y-auto rounded-xl border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 p-2">
                      {filteredTopics.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {filteredTopics.map(topic => (
                            <motion.button
                              key={topic}
                              type="button"
                              onClick={() => toggleTopic(topic)}
                              className={`text-left p-3 rounded-lg flex items-center transition-all ${
                                selectedTopics.includes(topic)
                                  ? 'bg-secondary text-white'
                                  : 'bg-white dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-600'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                selectedTopics.includes(topic)
                                  ? 'bg-white'
                                  : 'bg-secondary/10'
                              }`}>
                                {selectedTopics.includes(topic) ? (
                                  <CheckIcon className={`w-3 h-3 text-secondary`} />
                                ) : (
                                  <PlusIcon className={`w-3 h-3 text-secondary`} />
                                )}
                              </div>
                              <span className="font-medium">{topic}</span>
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-surface-500 dark:text-surface-400 p-4">
                          <SearchIcon className="w-10 h-10 mb-2 opacity-40" />
                          <p className="text-center">No topics found matching "{searchQuery}"</p>
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="mt-2 text-secondary text-sm font-medium hover:underline"
                          >
                            Clear search
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Modal footer */}
                  <div className="flex justify-between p-5 border-t border-surface-200 dark:border-surface-700">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex items-center px-4 py-2 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg transition-colors"
                    >
                      <RefreshCwIcon className="w-4 h-4 mr-1.5" />
                      Reset
                    </button>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || selectedTopics.length === 0}
                        className={`flex items-center px-5 py-2 rounded-lg bg-secondary text-white font-medium transition-all ${
                          isSubmitting || selectedTopics.length === 0
                            ? 'opacity-70 cursor-not-allowed'
                            : 'hover:bg-secondary-dark'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <BookmarkIcon className="w-4 h-4 mr-1.5" />
                            Save Preferences
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MainFeature;