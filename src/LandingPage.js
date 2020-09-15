import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function LandingPage() {
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
      className="intro"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Introduction to coffee roasting</h2>
      <h3>This quiz consists of 5 questions</h3>
      <Link to="/Page2">
        <motion.button
          whileHover={{
            scale: 1.1,
            textShadow: '0px 0px 8px rgb(255,255,255)',
            boxShadow: '0px 0px 8px rgb(255,255,255)',
          }}
        >
          Start
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default LandingPage;
