import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Page2 = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5 },
    },
    exit: {
      x: '50vw',
      transition: { ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2> This is page 2 :) </h2>
      <Link to="/LandingPage">
        <button>Take me back home</button>
      </Link>
    </motion.div>
  );
};

export default Page2;
