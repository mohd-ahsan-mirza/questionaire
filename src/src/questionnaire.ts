import { OptionsQuestion, NumberQuestion, SelectQuestion, TextQuestion, AllQuestions } from './question'

export class Questionnaire {
    fileName: string;
    optionsQuestions: OptionsQuestion[];
    textQuestions: TextQuestion[];
    selectQuestion: SelectQuestion[];
    numberQuestion: NumberQuestion[];
    allQuestions: (AllQuestions)[];
    storedAnswers: Map<number, AllQuestions>;
    constructor(filename: string) {
        this.fileName = filename;

        // Enable to test
        this.getTestData()

        this.allQuestions = [...this.optionsQuestions, ...this.numberQuestion, ...this.textQuestions, ...this.selectQuestion]

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
    
    getAllQuestions = () => {
        return this.allQuestions
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