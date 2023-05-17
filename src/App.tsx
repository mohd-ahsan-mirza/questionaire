import React, { useState } from 'react';
import { questionnaire } from './src/questionnaire'

/*
  TODO:
    - Get questions from JSON object
    - Unit tests
    - Make mock API call
*/

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedOption, setSelectedOption] = useState(-1);
  const [currentAnswer, setAnswer] = useState('');
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedNumber, setNumber] = useState('')

  const [showFinalPage, shouldShowFinalPage] = useState(false)

  const handleOptionChange = (id: number, optionIndex: number) => {
    questionnaire.updateStoredAnswer(id, optionIndex)
    setSelectedOption(optionIndex);
  };

  const handleAnswerChange = (id: number, text: string) => {
    questionnaire.updateStoredAnswer(id, text)
    setAnswer(text)
  };

  const handleSelectChange = (id: number, value: string) => {
    questionnaire.updateStoredAnswer(id, value)
    setSelectedValue(value)
  }

  const handleNumberChange = (id: number, value: string) => {
    questionnaire.updateStoredAnswer(id, value)
    setNumber(value)
  }

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      const question = questionnaire.getAllQuestions()[currentQuestion - 1];
      const storedAnswer = questionnaire.getStoredAnswer(question.id);

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
    if (currentQuestion === questionnaire.getAllQuestions().length - 1) {
      shouldShowFinalPage(true)
      return
    }
    const nextQuestion = questionnaire.getAllQuestions()[currentQuestion + 1];
    const nextStoredAnswer = questionnaire.getStoredAnswer(nextQuestion.id);
    const question = questionnaire.getAllQuestions()[currentQuestion];
    if (question.type == 'radio') {
      if (selectedOption === -1 && question.required) {
        alert('Please select an option');
        return
      } else {
        if (nextStoredAnswer !== undefined) {
          setSelectedOption(Number(nextStoredAnswer));
        }
      }
    }
    if (question.type === 'text') {
      if (currentAnswer === '' && question.required) {
        alert('Please write something') 
        return
      } else {
        setAnswer('')
        if (nextStoredAnswer !== undefined) {
          setAnswer(nextStoredAnswer.toString())
        }
      }
    }
    if(question.type === 'select') {
      if (selectedValue === '' && question.required) {
        alert('Please select something')
        return
      } else {
        setSelectedValue('')
        if (nextStoredAnswer !== undefined) {
          setSelectedValue(nextStoredAnswer.toString())
        }
      }
    }
    if(question.type === 'number') {
      if ((selectedNumber === '' && question.required) || (selectedNumber !== '' && !Number.isNaN(selectedNumber) && Number(selectedNumber) <= 0)) {
        setNumber('')
        alert('Please select a positive number')
        return
      } else {
        setNumber('')
        if (nextStoredAnswer !== undefined) {
          setNumber(nextStoredAnswer.toString())
        }
      }
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const renderQuestion = () => {
    const question = questionnaire.getAllQuestions()[currentQuestion];
    return (
      <div className="card d-flex align-items-center justify-content-center">
        <div className="card-body">
          <h2 className="card-title">{question.text}</h2>
          <div>
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
                min={question.minimum}
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
          </div>
          <div className="d-flex align-items-center justify-content-lg-between">
            <div className='col-xs-3'>
              <button className="btn btn-primary mt-3 btn-block" onClick={handleBackClick}>
                Back
              </button>
            </div>
            <div className='col-xs-3'>
              <button className="btn btn-primary mt-3 btn-block" onClick={handleNextClick}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderThankYouPage = () => {
    questionnaire.sendResponses()
    return (
      <div>
        <p>Thank you for your participation!</p>
      </div>
    );
  };

  return (
    <div className="App">
      <h1 className="d-flex align-items-center justify-content-center">Questionnaire</h1>
      {showFinalPage ? renderThankYouPage() : renderQuestion()}
    </div>
  );
}

export default App;

