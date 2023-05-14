interface Question {
    id: number;
    text: string;
    
}

export interface OptionsQuestion extends Question{
    options: string[];
    type: 'radio';
    answer: number;
}

export interface TextQuestion extends Question{
    type: 'text';
    answer: string;
}