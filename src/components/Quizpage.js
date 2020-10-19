import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const quizData = [
  {
    id: 0,
    questionText: 'Coffee roasting is a sensory driven process',
    answers: [
      { id: 1, value: 'True', isChecked: false },
      { id: 0, value: 'False', isChecked: false },
    ],
    correctAnswer: [1],
    answerType: 'single',
  },
  {
    id: 1,
    questionText:
      'You must apply convection heat only at the beginning of the roasting process',
    answers: [
      { id: 1, value: 'True', isChecked: false },
      { id: 0, value: 'False', isChecked: false },
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
        isChecked: false,
      },
      {
        id: 1,
        value:
          'Must be Arabica, scored 80% by a Q grader and has no more that 7 full defects in a 300 g sample.',
        isChecked: false,
      },
      {
        id: 2,
        value:
          'Must be Arabica, scored 80% by a Q grader and has no more that 5 full defects in a 300 g sample.',
        isChecked: false,
      },
      { id: 3, value: 'None of the above', isChecked: false },
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
        isChecked: false,
      },
      {
        id: 1,
        value: 'The previous answer is missing the pre-drying phase.',
        isChecked: false,
      },
      {
        id: 2,
        value: 'Phases overlap and cannot be easily defined.',
        isChecked: false,
      },
      { id: 3, value: 'All of the above.', isChecked: false },
    ],
    correctAnswer: [0],
    answerType: 'multiple',
  },
  {
    id: 4,
    questionText: 'Seasoning the roaster helps because:',
    answers: [
      {
        id: 0,
        value:
          'It gives an opportunity to practice the various controls on your roaster with cheaply bought green beans.',
        isChecked: false,
      },
      {
        id: 1,
        value: 'Gets rid of manufacturing contaminants',
        isChecked: false,
      },
      { id: 2, value: 'Coats the drum with coffee oils.', isChecked: false },
      { id: 3, value: 'All of the above.', isChecked: false },
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

  const checkAnswer = (event) => {
    event.preventDefault();
    if (selectedAnswers) console.log(selectedAnswers);
  };

  const nextQuestion = (event) => {
    console.log(selectedAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < numberOfQuestions - 1)
      setCurrentQuestion(currentQuestion + 1);
    else setCurrentQuestion(0);
  };

  const handleChange = (event) => {
    const { checked, id, type, value, name } = event.target;
    // console.log(
    //   'id: ' +
    //     id +
    //     ', name: ' +
    //     name +
    //     ', type: ' +
    //     type +
    //     ', checked: ' +
    //     checked +
    //     ', value: ' +
    //     value
    // );
    switch (type) {
      case 'radio':
        checked && setSelectedAnswer(parseInt(id));
        // console.log(selectedAnswer);

        break;
      case 'checkbox':
        let currentChoices = quizData[currentQuestion].answers;
        currentChoices.forEach((choice) => {
          console.log(choice.value);
          console.log(value);
          if (choice.value === value) {
            setSelectedAnswers([...selectedAnswers, id]);
          } else {
            setSelectedAnswers(
              selectedAnswers.filter((choice) => {
                if (choice === id) return false;
                return true;
              })
            );
          }
        });
        // if (checked === true) {
        //   if (!selectedAnswers.includes(id)) {
        //     setSelectedAnswers([...selectedAnswers, id]);
        //   }
        // } else {
        //   setSelectedAnswers(
        //     selectedAnswers.filter((item) => {
        //       if (item === id) return false;
        //       return true;
        //     })
        //   );
        // }
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
                {answerChoice.value}
              </label>
            </li>
          ));
        }
        break;
      case 'multiple':
        return currentAnswers.map((answerChoice, i) => (
          <li>
            <label>
              <input
                type="checkbox"
                name="multipleChoice"
                id={answerChoice.id}
                onChange={handleChange}
              />
              {answerChoice.value}
            </label>
          </li>
        ));
        break;
      default:
        break;
    }
    // return currentAnswers.map((answerChoice, i) =>
    //   answerType === 'single' ? (
    //     <li key={answerChoice.id}>
    //       <input
    //         type="radio"
    //         name="answer"
    //         id={answerChoice.id}
    //         onChange={handleChange}
    //         checked={selectedAnswer === answerChoice.id}
    //       />
    //       {answerChoice.value}
    //     </li>
    //   ) : (
    //     <li key={answerChoice.id}>
    //       <input
    //         type="checkbox"
    //         name="answer"
    //         id={answerChoice.id}
    //         onChange={handleChange}
    //         checked={selectedAnswers.forEach((item) => {
    //           if (item === answerChoice.id) return true;
    //         })}
    //       />
    //       {answerChoice.value}
    //     </li>
    //   )
    // );
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
      {/* <form onSubmit={checkAnswer} id="answer-form"> */}
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
        <button onClick={checkAnswer}>Submit</button>
        <button onClick={nextQuestion}>Next</button>
        <Link to="/LandingPage">
          <button>Take me back home</button>
        </Link>
      </div>
      {/* </form> */}
    </motion.div>
  );
};

export default Quizpage;
