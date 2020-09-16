import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const quizData = [
  {
    id: 0,
    questionText: 'Coffee roasting is a sensory driven process',
    answers: [
      { id: 1, value: 'True' },
      { id: 0, value: 'False' },
    ],
    correctAnswerId: 1,
  },
  {
    id: 1,
    questionText:
      'You must apply convection heat only at the beginning of the roasting process',
    answers: [
      { id: 1, value: 'True' },
      { id: 0, value: 'False' },
    ],
    correctAnswerId: 0,
  },
  {
    id: 2,
    questionText: 'What defines Specialty coffee',
    answers: [
      {
        id: 0,
        value: 'Arabica coffee that comes from a special place on earth.',
      },
      {
        id: 1,
        value:
          'Must be Arabica, scored 80% by a Q grader and has no more that 7 full defects in a 300 g sample.',
      },
      {
        id: 2,
        value:
          'Must be Arabica, scored 80% by a Q grader and has no more that 5 full defects in a 300 g sample.',
      },
      { id: 99, value: 'None of the above' },
    ],
    correctAnswerId: 2,
  },
  {
    id: 3,
    questionText: 'Loosely speaking, the agreed upon phases in roasting are:',
    answers: [
      {
        id: 0,
        value: 'Drying phase, Maillard phase, development phase.',
      },
      { id: 1, value: 'The previous answer is missing the pre-drying phase.' },
      { id: 2, value: 'Phases overlap and cannot be easily defined.' },
      { id: 3, value: 'All of the above.' },
    ],
    correctAnswerId: 0,
  },
  {
    id: 4,
    questionText: 'Seasoning the roaster helps because:',
    answers: [
      {
        id: 0,
        value:
          'It gives an opportunity to practice the various controls on your roaster with cheaply bought green beans.',
      },
      { id: 1, value: 'Gets rid of manufacturing contaminants' },
      { id: 2, value: 'Coats the drum with coffee oils.' },
      { id: 3, value: 'All of the above.' },
    ],
    correctAnswerId: 3,
  },
];

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
      className="quiz-content"
    >
      <div className="feedback-area">
        <h4>Question number</h4>
        <h4>Correct number</h4>
      </div>
      <div className="quiz-area">
        <h2> This is page 2 :) </h2>
      </div>
      <div className="controls-area">
        <Link to="/LandingPage">
          <button>Take me back home</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Page2;
