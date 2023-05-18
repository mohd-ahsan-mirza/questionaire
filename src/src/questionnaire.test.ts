import { OptionsQuestion, NumberQuestion, SelectQuestion, TextQuestion, AllQuestions } from './question'
import { Questionnaire } from './questionnaire'

test("Questionnaire:getStoredAnswer", () => {
    const questionnaire = new Questionnaire(true)
    expect(questionnaire.getStoredAnswer(1)).toEqual(-1);
});

test("Questionnaire:updateStoredAnswer", () => {
    const questionnaire = new Questionnaire(true)
    const questionId = 3
    const answer = 'nice guy'
    questionnaire.updateStoredAnswer(questionId, answer)
    expect(questionnaire.getStoredAnswer(questionId)).toEqual(answer);
});

test("Questionnaire:validateMandatoryQuestions", () => {
    const questionnaire = new Questionnaire(true)
    expect(questionnaire.validateMandatoryQuestions()).toEqual(false);
});