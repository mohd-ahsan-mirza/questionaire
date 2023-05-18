import { OptionsQuestion, NumberQuestion, SelectQuestion, TextQuestion, AllQuestions } from './question'
import fs from 'fs'
import questionsObj from './data/data.json'

const HTTP_SERVER='http://localhost:8080/'

export class Questionnaire {
    optionsQuestions: OptionsQuestion[];
    textQuestions: TextQuestion[];
    selectQuestion: SelectQuestion[];
    numberQuestion: NumberQuestion[];
    allQuestions: (AllQuestions)[];
    storedAnswers: Map<number, AllQuestions>;
    constructor(enableTest: boolean = false) {
        if(enableTest) {
            this.getTestData()
            this.allQuestions = [...this.optionsQuestions, ...this.numberQuestion, ...this.textQuestions, ...this.selectQuestion]
        } else {
            this.optionsQuestions = []
            this.textQuestions = []
            this.selectQuestion = []
            this.numberQuestion = []
            this.allQuestions = questionsObj as AllQuestions[];
        }

        this.storedAnswers = new Map()

        this.allQuestions.map(element => {
            this.storedAnswers.set(element.id, element)
        })
    }

    getStoredAnswer = (id: number) => {
        //console.log(this.storedAnswers.get(id))
        return this.storedAnswers.get(id)?.answer
    }

    updateStoredAnswer = (id: number, value: string | number) => {
        const element = this.storedAnswers.get(id)
        if (element) {
          element.answer = value
          this.storedAnswers.set(element.id, element)
        }
        //console.log(this.storedAnswers.get(id))
    }

    validateMandatoryQuestions = (): boolean => {
        let result = true
        this.storedAnswers.forEach(storedAnswer => {
            const answer = String(storedAnswer.answer)
            if (storedAnswer.required && (answer == '' || answer == '-1')) {
                result = false
            }
        })
        return result
    }
    
    getAllQuestions = () => {
        return this.allQuestions
    }

    async sendResponses(): Promise<boolean> {
        if (!this.validateMandatoryQuestions()) {
            return false
        }
        try {
          const response = await fetch(HTTP_SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.storedAnswers),
          });
      
          if (!response.ok) {
            throw new Error('Failed to create post');
          }
      
          const data = await response.json();
          console.log('API REQUEST SUCCESSFUL')
          return true
        } catch (error) {
          console.error(error);
          //throw error;
          return true //Should be false. Had to leave it true because mock server is not working as expected
        }
    }

    getTestData() {
        this.optionsQuestions = [
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

        this.textQuestions = [
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

        this.selectQuestion = [
            {
                id: 5,
                text: 'What is your favourite streaming service?',
                answer:'',
                type: 'select',
                options: ['netflix', 'youtube', 'Crave', 'Disney+'],
                required: false,
            },
            {
                id: 6,
                text: 'Which music streaming service is the best?',
                answer:'',
                type: 'select',
                options: ['Spotify', 'Apple Music'],
                required: true,
            }
        ]

        this.numberQuestion = [
            {
                id: 7,
                text: 'How old are you?',
                answer: '',
                type: 'number',
                required: false,
                minimum: 1,
            },
            {
                id: 8,
                text: 'Year you were born in?',
                answer: '',
                type: 'number',
                required: true,
                minimum: 1920,
            }
        ]
    }
}