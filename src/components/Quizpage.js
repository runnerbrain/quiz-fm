import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const quizData = [
  {
    id: 0,
    questionText: 'Coffee roasting is a sensory driven process',
    answers: [
      { id: 1, value: 'True', isCorrect: true },
      { id: 0, value: 'False', isCorrect: false },
    ],
    correctAnswer: [1],
    answerType: 'single',
  },
  {
    id: 1,
    questionText:
      'You must apply convection heat only at the beginning of the roasting process',
    answers: [
      { id: 1, value: 'True', isCorrect: false },
      { id: 0, value: 'False', isCorrect: true },
    ],
    correctAnswer: [0],
    answerType: 'single',
  },
  {
    id: 2,
    questionText: 'What defines Specialty coffee',
    answers: [
      {
        id: 0,
        value: 'Arabica coffee that comes from a special place on earth.',
        isCorrect: false,
      },
      {
        id: 1,
        value:
          'Must be Arabica, scored 80% by a Q grader and has no more that 7 full defects in a 300 g sample.',
        isCorrect: false,
      },
      {
        id: 2,
        value:
          'Must be Arabica, scored 80% by a Q grader and has no more that 5 full defects in a 300 g sample.',
        isCorrect: true,
      },
      { id: 3, value: 'None of the above', isCorrect: false },
    ],
    correctAnswer: [2],
    answerType: 'multiple',
  },
  {
    id: 3,
    questionText: 'Loosely speaking, the agreed upon phases in roasting are:',
    answers: [
      {
        id: 0,
        value: 'Drying phase, Maillard phase, development phase.',
        isCorrect: true,
      },
      {
        id: 1,
        value: 'The previous answer is missing the pre-drying phase.',
        isCorrect: false,
      },
      {
        id: 2,
        value: 'Phases overlap and cannot be easily defined.',
        isCorrect: false,
      },
      { id: 3, value: 'All of the above.', isCorrect: false },
    ],
    correctAnswer: [0],
    answerType: 'single',
  },
  {
    id: 4,
    questionText: 'Seasoning the roaster helps because:',
    answers: [
      {
        id: 0,
        value:
          'It gives an opportunity to practice the various controls on your roaster with cheaply bought green beans.',
        isCorrect: false,
      },
      {
        id: 1,
        value: 'Gets rid of manufacturing contaminants',
        isCorrect: false,
      },
      { id: 2, value: 'Coats the drum with coffee oils.', isCorrect: false },
      { id: 3, value: 'All of the above.', isCorrect: true },
    ],
    correctAnswer: [3],
    answerType: 'multiple',
  },
];
const numberOfQuestions = 5;

const Quizpage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const nextQuestion = () => {
    if (currentQuestion < numberOfQuestions - 1)
      setCurrentQuestion(currentQuestion + 1);
    else setCurrentQuestion(0);
  };

  const handleChange = (event) => {
    console.log(
      'here --: ' +
        event.target.id +
        '  ' +
        event.target.name +
        ' -- ' +
        event.target.type +
        '-- ' +
        event.target.checked
    );
    switch (event.target.type) {
      case 'radio':
        event.target.checked && setSelectedAnswer(parseInt(event.target.id));
        break;
      case 'checkbox': {
        if (event.target.checked === true) {
          !selectedAnswers.includes(event.target.id)
            ? selectedAnswers.push(event.target.id)
            : null;
        } else {
          selectedAnswers.includes(event.target.id)
            ? selectedAnswers.splice(
                selectedAnswers.indexOf(event.target.id),
                1
              )
            : null;
        }
      }
      default:
        break;
    }
    // event.target.type === 'radio'
    //   ? event.target.checked && setSelectedAnswer(parseInt(event.target.id))
    //   : event.target.checked && selectedAnswers.push(event.target.id);

    // setSelectedAnswers([...selectedAnswers,
    // }]);
  };

  const renderAnswers = (currentAnswers, answerType) => {
    // currentAnswers.map((answerChoice) => console.log(answerChoice.value));
    return currentAnswers.map((answerChoice) =>
      answerType === 'single' ? (
        <li>
          <input
            type="radio"
            name="answer"
            id={answerChoice.id}
            onChange={handleChange}
            // checked={selected === answerChoice.id}
          />
          {answerChoice.value}
        </li>
      ) : (
        <li>
          <input
            type="checkbox"
            name={`answer${answerChoice.id}`}
            id={answerChoice.id}
            onChange={handleChange}
          />
          {answerChoice.value}
        </li>
      )
    );
    //   console.log(answerChoice.value)
    // );
    //   answerType === 'single' ? (
    //     <input
    //       type="radio"
    //       name="answer"
    //       id={currentQuestion.id}
    //       value={currentQuestion.id}
    //       onChange={handleChange}
    //     />
    //   ) : (
    //     <input type="checkbox" onChange={handleChange} />
    //   )
    // );
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    if (selectedAnswers) console.log(selectedAnswers);
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
          <button>Submit</button>
          <button onClick={nextQuestion}>Next</button>
          <Link to="/LandingPage">
            <button>Take me back home</button>
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default Quizpage;
