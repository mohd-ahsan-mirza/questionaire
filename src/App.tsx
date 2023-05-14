import React, { useState } from 'react';
import { OptionsQuestion, TextQuestion } from './src/questions'

const optionsQuestions: OptionsQuestion[] = [
  {
    id: 1,
    text: 'Your first car make?',
    options: ['honda', 'toyota', 'other'],
    answer: 1,
    type: 'radio'
  },
  {
    id: 2,
    text: 'Favourite color?',
    options: ['red', 'blue', 'other'],
    answer: 0,
    type: 'radio'
  },
];

const textQuestions: TextQuestion[] = [
  {
    id: 3,
    text: 'What do you think Abraham Lincoln?',
    answer: '',
    type: 'text',
  },
]

const allQuestions: (OptionsQuestion|TextQuestion)[] = [...optionsQuestions, ...textQuestions];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [currentAnswer, setAnswer] = useState('');

  const handleOptionChange = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleAnswerChange = (text: string) => {
    setAnswer(text)
  };

  const handleNextClick = () => {
    const question = allQuestions[currentQuestion];
    if (question.type == 'radio') {
      if (selectedOption === -1) {
        alert('Please select an option');
      } else {
        setSelectedOption(-1);
        if (currentQuestion === allQuestions.length - 1) {
          alert('You are done!')
          useState(false)
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if (question.type == 'text') {
      if (currentAnswer == '') {
        alert('Please write something') 
      } else {
        if (currentQuestion === allQuestions.length - 1) {
          alert('You are done!')
          useState(false)
        } else {
          setAnswer('')
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
  };

  const renderQuestion = () => {
    const question = allQuestions[currentQuestion];
    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{question.text}</h2>
          {question.type === 'text' && (
              <input
                type="text"
                className="form-control"
                id={`currentAnswer-${question.id}`}
                onChange={(event) =>
                  handleAnswerChange(event.target.value)
                }
              />
          )}
          {question.type == 'radio' && (question.options.map((option, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === index}
                  onChange={() => handleOptionChange(index)}
                />
                <label className="form-check-label" htmlFor={`option-${index}`}>
                  {option}
                </label>
              </div>
          )))}
            <button className="btn btn-primary mt-3" onClick={handleNextClick}>
              Next
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Questionnaire</h1>
      {renderQuestion()}
    </div>
  );
}

export default App;

