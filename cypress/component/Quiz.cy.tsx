import React from 'react'; 
import Quiz from '../../client/src/components/Quiz';
import { mount } from 'cypress/react18';

describe('<Quiz /> Component Test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
  });

  it('displays the Start Quiz button initially', () => {
    mount(<Quiz />);
    cy.get('[data-cy="start-quiz-btn"]').should('be.visible');
  });
});