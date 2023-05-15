import React, { useState } from 'react';
import { OptionsQuestion, NumberQuestion, SelectQuestion, TextQuestion } from './src/questions'

const optionsQuestions: OptionsQuestion[] = [
  {
    id: 1,
    text: 'Your first car make?',
    options: ['honda', 'toyota', 'other'],
    answer: -1,
    type: 'radio'
  },
  {
    id: 2,
    text: 'Favourite color?',
    options: ['red', 'blue', 'other'],
    answer: -1,
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
  {
    id: 4,
    text: 'Give a brief description of your dream destination?',
    answer: '',
    type: 'text',
  },
]

const selectQuestion: SelectQuestion[] = [
  {
    id: 5,
    text: 'What is your favourite streaming service?',
    answer:'',
    type: 'select',
    options: ['netflix', 'youtube', 'Crave', 'Disney+']
  }
]

const numberQuestion: NumberQuestion[] = [
  {
    id: 6,
    text: 'How old are you?',
    answer: '',
    type: 'number'
  }
]

const allQuestions: (OptionsQuestion|TextQuestion|NumberQuestion|SelectQuestion)[] = [...optionsQuestions, ...numberQuestion, ...textQuestions, ...selectQuestion];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedOption, setSelectedOption] = useState(-1);
  const [currentAnswer, setAnswer] = useState('');
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedNumber, setNumber] = useState('')

  const [showFinalPage, shouldShowFinalPage] = useState(false)

  const handleOptionChange = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleAnswerChange = (text: string) => {
    setAnswer(text)
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
  }

  const handleNumberChange = (value: string) => {
    setNumber(value)
  }

  const handleNextClick = () => {
    const question = allQuestions[currentQuestion];
    if (question.type == 'radio') {
      if (selectedOption === -1) {
        alert('Please select an option');
      } else {
        setSelectedOption(-1);
        if (currentQuestion === allQuestions.length - 1) {
          shouldShowFinalPage(true)
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if (question.type == 'text') {
      if (currentAnswer == '') {
        alert('Please write something') 
      } else {
        setAnswer('')
        if (currentQuestion === allQuestions.length - 1) {
          shouldShowFinalPage(true)
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if(question.type == 'select') {
      if (selectedValue == '') {
        alert('Please select something')
      } else {
        setSelectedValue('')
        if (currentQuestion === allQuestions.length - 1) {
          shouldShowFinalPage(true)
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if(question.type == 'number') {
      if (selectedNumber == '') {
        alert('Please select a number')
      } else {
        setNumber('')
        if (currentQuestion === allQuestions.length - 1) {
          shouldShowFinalPage(true)
        } else {
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
                value={currentAnswer}
                id={`text-${question.id}`}
                onChange={(event) =>
                  handleAnswerChange(event.target.value)
                }
              />
          )}
           {question.type === 'number' && (
              <input
                type="number"
                className="form-control"
                value={selectedNumber}
                id={`text-${question.id}`}
                onChange={(event) =>
                  handleNumberChange(event.target.value)
                }
              />
          )}
          {question.type == 'radio' && (question.options.map((option, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id={`radio-${index}`}
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
          {question.type === 'select' && (
              <select
                className="form-select"
                id={`select-${question.id}`}
                value={selectedValue}
                onChange={(event) =>
                  handleSelectChange(event.target.value)
                }
              >
                <option value="">Select an option</option>
                {question.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
          )}
          <button className="btn btn-primary mt-3" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderThankYouPage = () => {
    return (
      <div>
        <p>Thank you for your participation!</p>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Questionnaire</h1>
      {showFinalPage ? renderThankYouPage() : renderQuestion()}
    </div>
  );
}

export default App;

