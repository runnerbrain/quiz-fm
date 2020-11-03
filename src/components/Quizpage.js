import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import _, { isEmpty, isNull } from 'lodash';
import isEqual from 'lodash/isEqual';

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
  const [controlsArea, setControlsArea] = useState('controls-area-left');
  const [correctNumber, setCorrectNumber] = useState(0);
  const [inCorrectNumber, setInCorrectNumber] = useState(0);
  const [messageText, setMessageText] = useState(null);
  const [msgAreaClass, setMsgAreaClass] = useState(null);

  useEffect(() => {
    console.log(selectedAnswers);
    if (selectedAnswers.length === 0) console.log('empty array');
  }, [selectedAnswers]);

  const comparator = (a, b) => {
    return a - b;
  };

  const controlsToggle = (msg, msgClass) => {
    setShowNext(true);
    setShowSubmit(false);
    setControlsArea('controls-area-right');
    setShowError(true);
    setMessageText(`${msg}`);
    setMsgAreaClass(`${msgClass}`);
    setTimeout(() => {
      setShowError(false);
    }, 1500);
    console.log('right');
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    if (isEmpty(selectedAnswers) && isNull(selectedAnswer)) {
      setMessageText('You must make a selection.');
      setShowError(true);
      setMsgAreaClass('msg-area error');
      setTimeout(() => {
        setShowError(false);
      }, 1500);
      return;
    }

    switch (quizData[currentQuestion].answerType) {
      case 'single':
        console.log('single');
        if (quizData[currentQuestion].correctAnswer[0] === selectedAnswer) {
          setCorrectNumber(correctNumber + 1);
          controlsToggle('You got it!', 'msg-area correct-answer');
        } else {
          setInCorrectNumber(inCorrectNumber + 1);
          controlsToggle('Incorrect', 'msg-area error');
        }
        break;
      case 'multiple':
        setShowNext(true);
        setShowSubmit(false);
        let sortedSelected = selectedAnswers.sort(function (a, b) {
          if (a < b) return -1;
          if (b < a) return 1;
          return 0;
        });
        let sortedAnswers = quizData[currentQuestion].correctAnswer.sort(
          comparator
        );
        if (isEqual(sortedSelected, sortedAnswers)) {
          setCorrectNumber(correctNumber + 1);
          controlsToggle('You got it!', 'msg-area correct-answer');
        } else {
          setInCorrectNumber(inCorrectNumber + 1);
          controlsToggle('Incorrect', 'msg-area error');
        }
        break;

      default:
        break;
    }
  };

  const nextQuestion = (event) => {
    setShowNext(false);
    setShowSubmit(true);
    setControlsArea('controls-area-left');
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    if (currentQuestion < numberOfQuestions - 1)
      setCurrentQuestion(currentQuestion + 1);
    else setCurrentQuestion(0);
  };

  const handleChange = (event) => {
    const { checked, id, type } = event.target;

    switch (type) {
      case 'radio':
        if (checked) setSelectedAnswer(id);
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
    // console.log(selectedAnswers);
  };

  const renderAnswers = (currentAnswers, answerType) => {
    switch (answerType) {
      case 'single':
        return currentAnswers.map((answerChoice, i) => (
          <li key={answerChoice.id}>
            <label className="answer" forhtml={answerChoice.id}>
              <div className="input-elem">
                <input
                  type="radio"
                  name="singleChoice"
                  id={answerChoice.id}
                  onChange={handleChange}
                  checked={selectedAnswer === answerChoice.id}
                />
              </div>
              <div className="answer-text">{answerChoice.answerText}</div>
            </label>
          </li>
        ));
        break;
      case 'multiple':
        // console.log(selectedAnswers);
        return currentAnswers.map((answerChoice, i) => (
          <li key={answerChoice.id}>
            <label className="answer" forhtml={answerChoice.id}>
              <div className="input-elem">
                <input
                  type="checkbox"
                  name="multipleChoice"
                  id={answerChoice.id}
                  value={answerChoice.answerText}
                  onChange={handleChange}
                  checked={selectedAnswers.includes(answerChoice.id)}
                />
              </div>
              <div className="answer-text">{answerChoice.answerText}</div>
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
        className="quiz-area"
      >
        <div className="static-feedback">
          <span>{`Question ${currentQuestion + 1} of ${quizData.length}`}</span>
          <span>{`${correctNumber} Correct - ${inCorrectNumber} Incorrect`}</span>
        </div>
        <form onSubmit={checkAnswer} className="form-area">
          <div className="input-area">
            <div className="question-text">
              {quizData[currentQuestion].questionText}
            </div>
            <ul>
              {renderAnswers(
                quizData[currentQuestion].answers,
                quizData[currentQuestion].answerType
              )}
            </ul>
          </div>
          <div className={controlsArea}>
            {showSubmit && (
              <div className="submit">
                <motion.button
                  onClick={checkAnswer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  duration={{ duration: 1 }}
                >
                  Submit
                </motion.button>
              </div>
            )}

            {showNext && (
              <div className="next">
                <motion.button
                  onClick={nextQuestion}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  Next
                </motion.button>
              </div>
            )}

            {/* <Link to="/LandingPage">
              <button>Take me back home</button>
            </Link> */}
          </div>
        </form>
        <motion.div
          className={msgAreaClass}
          animate={
            showError
              ? { opacity: 1 }
              : {
                  opacity: 0,
                }
          }
        >
          {messageText}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Quizpage;
