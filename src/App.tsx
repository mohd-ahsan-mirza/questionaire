import React, { useState } from 'react';
import { OptionsQuestion, NumberQuestion, SelectQuestion, TextQuestion, AllQuestions } from './src/questions'

const optionsQuestions: OptionsQuestion[] = [
  {
    id: 1,
    text: 'Your first car make?',
    options: ['honda', 'toyota', 'other'],
    answer: -1,
    type: 'radio',
    required: true
  },
  {
    id: 2,
    text: 'Favourite color?',
    options: ['red', 'blue', 'other'],
    answer: -1,
    type: 'radio',
    required: false,
  },
];

const textQuestions: TextQuestion[] = [
  {
    id: 3,
    text: 'What do you think Abraham Lincoln?',
    answer: '',
    type: 'text',
    required: true,
  },
  {
    id: 4,
    text: 'Give a brief description of your dream destination?',
    answer: '',
    type: 'text',
    required: false,
  },
]

const selectQuestion: SelectQuestion[] = [
  {
    id: 5,
    text: 'What is your favourite streaming service?',
    answer:'',
    type: 'select',
    options: ['netflix', 'youtube', 'Crave', 'Disney+'],
    required: false,
  }
]

const numberQuestion: NumberQuestion[] = [
  {
    id: 6,
    text: 'How old are you?',
    answer: '',
    type: 'number',
    required: false,
  }
]

const allQuestions: (AllQuestions)[] = [...optionsQuestions, ...numberQuestion, ...textQuestions, ...selectQuestion];
let storedAnswers: Map<number, AllQuestions> = new Map()

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedOption, setSelectedOption] = useState(-1);
  const [currentAnswer, setAnswer] = useState('');
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedNumber, setNumber] = useState('')

  const [showFinalPage, shouldShowFinalPage] = useState(false)

  allQuestions.map(element => {
    storedAnswers.set(element.id, element)
  })

  const getStoredAnswer = (id: number) => {
    //console.log(storedAnswers.get(id))
    return storedAnswers.get(id)?.answer
  }

  const updateStoredAnswer = (id: number, value: string | number) => {
    const element = storedAnswers.get(id)
    if (element) {
      element.answer = value
      storedAnswers.set(element.id, element)
    }
    //console.log(storedAnswers.get(id))
  }

  const handleOptionChange = (id: number, optionIndex: number) => {
    updateStoredAnswer(id, optionIndex)
    setSelectedOption(optionIndex);
  };

  const handleAnswerChange = (id: number, text: string) => {
    updateStoredAnswer(id, text)
    setAnswer(text)
  };

  const handleSelectChange = (id: number, value: string) => {
    updateStoredAnswer(id, value)
    setSelectedValue(value)
  }

  const handleNumberChange = (id: number, value: string) => {
    updateStoredAnswer(id, value)
    setNumber(value)
  }

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      const question = allQuestions[currentQuestion - 1];
      const storedAnswer = getStoredAnswer(question.id);

      if (storedAnswer !== undefined) {
        if (question.type == 'radio') {
          setSelectedOption(Number(storedAnswer))
        }
        if (question.type == 'text') {
          setAnswer(storedAnswer.toString())
        }
        if (question.type == 'select') {
          setSelectedValue(storedAnswer.toString())
        }
        if (question.type == 'number') {
          setNumber(storedAnswer.toString())
        }
      }

      setCurrentQuestion(currentQuestion - 1);
    }
  }

  const handleNextClick = () => {
    const question = allQuestions[currentQuestion];
    if (question.type == 'radio') {
      if (selectedOption === -1 && question.required) {
        alert('Please select an option');
      } else {
        if (currentQuestion === allQuestions.length - 1) {
          shouldShowFinalPage(true)
        } else {
          const question = allQuestions[currentQuestion + 1];
          const storedAnswer = getStoredAnswer(question.id);
          if (storedAnswer !== undefined) {
            setSelectedOption(Number(storedAnswer));
          }
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if (question.type == 'text') {
      if (currentAnswer == '' && question.required) {
        alert('Please write something') 
      } else {
        setAnswer('')
        if (currentQuestion === allQuestions.length - 1) {
          shouldShowFinalPage(true)
        } else {
          const question = allQuestions[currentQuestion + 1];
          const storedAnswer = getStoredAnswer(question.id);
          if (storedAnswer !== undefined) {
            setAnswer(storedAnswer.toString())
          }
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if(question.type == 'select') {
      if (selectedValue == '' && question.required) {
        alert('Please select something')
      } else {
        setSelectedValue('')
        if (currentQuestion === allQuestions.length - 1) {
          shouldShowFinalPage(true)
        } else {
          const question = allQuestions[currentQuestion + 1];
          const storedAnswer = getStoredAnswer(question.id);
          if (storedAnswer !== undefined) {
            setSelectedValue(storedAnswer.toString())
          }
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if(question.type == 'number') {
      if (selectedNumber == '' && question.required) {
        alert('Please select a number')
      } else {
        setNumber('')
        if (currentQuestion === allQuestions.length - 1) {
          shouldShowFinalPage(true)
        } else {
          const question = allQuestions[currentQuestion + 1];
          const storedAnswer = getStoredAnswer(question.id);
          if (storedAnswer !== undefined) {
            setNumber(storedAnswer.toString())
          }
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
  };

  const renderQuestion = () => {
    const question = allQuestions[currentQuestion];
    return (
      <div className="card d-flex align-items-center justify-content-center">
        <div className="card-body">
          <h2 className="card-title">{question.text}</h2>
          {question.type === 'text' && (
              <input
                type="text"
                className="form-control"
                value={currentAnswer}
                id={`text-${question.id}`}
                onChange={(event) =>
                  handleAnswerChange(question.id, event.target.value)
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
                  handleNumberChange(question.id, event.target.value)
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
                  value={selectedOption}
                  checked={selectedOption === index}
                  onChange={() => handleOptionChange(question.id, index)}
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
                  handleSelectChange(question.id, event.target.value)
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
          <div className='col-xs-3'><button className="btn btn-primary mt-3 btn-block" onClick={handleNextClick}>
            Next
          </button></div>
          <div className='col-xs-3'></div><button className="btn btn-primary mt-3 btn-block" onClick={handleBackClick}>
            Back
          </button></div>
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

