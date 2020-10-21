import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const quizData = [
  {
    id: 0,
    questionText: 'Coffee roasting is a sensory driven process',
    answers: [
      { id: 'a00', answerText: 'True', isChecked: false },
      { id: 'a01', answerText: 'False', isChecked: false },
    ],
    correctAnswer: ['a00'],
    answerType: 'single',
  },
  {
    id: 1,
    questionText:
      'You must apply convection heat only at the beginning of the roasting process',
    answers: [
      { id: 'a10', answerText: 'True', isChecked: false },
      { id: 'a11', answerText: 'False', isChecked: false },
    ],
    correctAnswer: ['a11'],
    answerType: 'single',
  },
  {
    id: 2,
    questionText: 'What defines Specialty coffee',
    answers: [
      {
        id: 'a20',
        answerText: 'Arabica coffee that comes from a special place on earth.',
        isChecked: false,
      },
      {
        id: 'a21',
        answerText:
          'Must be Arabica, scored 70% by a Q grader and has no more that 7 full defects in a 300 g sample.',
        isChecked: false,
      },
      {
        id: 'a22',
        answerText:
          'Must be Arabica, scored 80% by a Q grader and has no more that 5 full defects in a 300 g sample.',
        isChecked: false,
      },
      { id: 'a23', answerText: 'None of the above', isChecked: false },
    ],
    correctAnswer: ['a22'],
    answerType: 'multiple',
  },
  {
    id: 3,
    questionText: 'Loosely speaking, the agreed upon phases in roasting are:',
    answers: [
      {
        id: 'a30',
        answerText: 'Drying phase, Maillard phase, development phase.',
        isChecked: false,
      },
      {
        id: 'a31',
        answerText: 'The previous answer is missing the pre-drying phase.',
        isChecked: false,
      },
      {
        id: 'a32',
        answerText: 'Phases overlap and cannot be easily defined.',
        isChecked: false,
      },
      { id: 'a33', answerText: 'All of the above.', isChecked: false },
    ],
    correctAnswer: ['a30'],
    answerType: 'multiple',
  },
  {
    id: 4,
    questionText: 'Seasoning the roaster helps because:',
    answers: [
      {
        id: 'a40',
        answerText:
          'It gives an opportunity to practice the various controls on your roaster with cheaply bought green beans.',
        isChecked: false,
      },
      {
        id: 'a41',
        answerText: 'Gets rid of manufacturing contaminants',
        isChecked: false,
      },
      {
        id: 'a42',
        answerText: 'Coats the drum with coffee oils.',
        isChecked: false,
      },
      { id: 'a43', answerText: 'None of the above.', isChecked: false },
    ],
    correctAnswer: ['a40', 'a41', 'a42'],
    answerType: 'multiple',
  },
];
const numberOfQuestions = 5;

const Quizpage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    console.log(selectedAnswers);
    if (selectedAnswers.length === 0) console.log('empty array');
  }, [selectedAnswers]);

  const checkAnswer = (event) => {
    event.preventDefault();
    if (!selectedAnswer) {
      setShowError(true);
      return;
    }
    switch (quizData[currentQuestion].answerType) {
      case 'single': {
        if (quizData[currentQuestion].correctAnswer[0] === selectedAnswer) {
          setShowNext(true);
          setShowSubmit(false);
          console.log('right');
        } else {
          setShowNext(true);
          setShowSubmit(false);
          console.log(' wrong');
        }
      }
    }

    if (!selectedAnswers) {
      setShowError(true);
      console.log(selectedAnswers);
    } else {
      setShowNext(true);
      setShowSubmit(false);
      // selectedAnswers.forEach(ans => if(ans))
    }
  };

  const nextQuestion = (event) => {
    // console.log(selectedAnswers);
    setShowNext(false);
    setShowSubmit(true);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    if (currentQuestion < numberOfQuestions - 1)
      setCurrentQuestion(currentQuestion + 1);
    else setCurrentQuestion(0);
  };

  const handleChange = (event) => {
    const { checked, id, type, value, name } = event.target;

    switch (type) {
      case 'radio':
        if (checked) setSelectedAnswer(id);
        // console.log(selectedAnswer);

        break;
      case 'checkbox':
        if (checked === true) {
          if (!selectedAnswers.includes(id)) {
            setSelectedAnswers([...selectedAnswers, id]);
          }
        } else {
          setSelectedAnswers(
            selectedAnswers.filter((item) => {
              if (item === id) return false;
              return true;
            })
          );
        }
        break;
      default:
        break;
    }
    console.log(selectedAnswers);
  };

  const renderAnswers = (currentAnswers, answerType) => {
    switch (answerType) {
      case 'single':
        {
          return currentAnswers.map((answerChoice, i) => (
            <li key={answerChoice.id}>
              <label forhtml={answerChoice.id}>
                <input
                  type="radio"
                  name="singleChoice"
                  id={answerChoice.id}
                  onChange={handleChange}
                  checked={selectedAnswer === answerChoice.id}
                />
                {answerChoice.answerText}
              </label>
            </li>
          ));
        }
        break;
      case 'multiple':
        console.log(selectedAnswers);
        return currentAnswers.map((answerChoice, i) => (
          <li>
            <label>
              <input
                type="checkbox"
                name="multipleChoice"
                id={answerChoice.id}
                value={answerChoice.answerText}
                onChange={handleChange}
                checked={selectedAnswers.includes(answerChoice.id)}
              />
              {answerChoice.answerText}
            </label>
          </li>
        ));
        break;
      default:
        break;
    }
  };

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
    <>
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
        <form onSubmit={checkAnswer} id="answer-form">
          <div className="quiz-area">
            {quizData[currentQuestion].questionText}
            <ul>
              {renderAnswers(
                quizData[currentQuestion].answers,
                quizData[currentQuestion].answerType
              )}
            </ul>
          </div>
          <div className="controls-area">
            {showSubmit && <button onClick={checkAnswer}>Submit</button>}
            {showNext && <button onClick={nextQuestion}>Next</button>}
            <Link to="/LandingPage">
              <button>Take me back home</button>
            </Link>
          </div>
        </form>
      </motion.div>
      {showError && <div className="msgArea">Error</div>}
    </>
  );
};

export default Quizpage;
