interface Question {
    id: number;
    text: string;
    required: boolean;
}

export interface OptionsQuestion extends Question {
    options: string[];
    type: 'radio';
    answer: number;
}

export interface TextQuestion extends Question {
    type: 'text';
    answer: string;
}

export interface SelectQuestion extends Question {
    type: 'select';
    options: string[];
    answer: string;
}

export interface NumberQuestion extends Question {
    type: 'number';
    minimum: number,
    answer: string;
}

export type AllQuestions = OptionsQuestion|TextQuestion|NumberQuestion|SelectQuestion