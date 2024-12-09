describe('Quiz End-To-End', () => {
    beforeEach(() => {
      // Visit the homepage and give it extra time if needed
      cy.visit('/', { timeout: 30000 });
  
      // Intercept the API call and respond with fixture data
      cy.intercept({
        method: 'GET',
        url: 'api/questions/random'
      }, {
        fixture: 'questions.json',
        statusCode: 200
      }).as('fixtureQuestions');
    });
  
    it("A user arrives at the home page where start button is", () => {
      // Check if "Start Quiz" button is visible on home page
      cy.get('button').contains('Start Quiz').should('be.visible');
    });
  
    it('should allow a user to complete the entire quiz (hard-coded)', () => {
      // Start the quiz
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@fixtureQuestions');
  
      // Q1: "What is the output of print(2 ** 3)?"
      cy.get('h2').contains('What is the output of print(2 ** 3)?').should('be.visible');
      cy.contains('.alert.alert-secondary', '8').prev('button').click();
  
      // Q2: "Which of the following is a mutable data type in Python?"
      cy.get('h2').contains('Which of the following is a mutable data type in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'list').prev('button').click();
  
      // Q3: "What is the keyword used to define a function in Python?"
      cy.get('h2').contains('What is the keyword used to define a function in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'def').prev('button').click();
  
      // Q4: "Which of the following is used to create an empty set?"
      cy.get('h2').contains('Which of the following is used to create an empty set?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'set()').prev('button').click();
  
      // Q5: "What is the output of len('hello world')?"
      cy.get('h2').contains("What is the output of len('hello world')?").should('be.visible');
      cy.contains('.alert.alert-secondary', '11').prev('button').click();
  
      // Q6: "Which method is used to remove whitespace...?"
      cy.get('h2').contains('Which method is used to remove whitespace from the beginning and end of a string?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'strip()').prev('button').click();
  
      // Q7: "What does the // operator do in Python?"
      cy.get('h2').contains('What does the // operator do in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'Performs integer division').prev('button').click();
  
      // Q8: "Which of the following is a valid variable name?"
      cy.get('h2').contains('Which of the following is a valid variable name in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'variable_1').prev('button').click();
  
      // Q9: "What is the output of type(3.14)?"
      cy.get('h2').contains('What is the output of type(3.14)?').should('be.visible');
      cy.contains('.alert.alert-secondary', "<class 'float'>").prev('button').click();
  
      // Q10: "Which of the following statements is used to handle exceptions in Python?"
      cy.get('h2').contains('Which of the following statements is used to handle exceptions in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'except').prev('button').click();
  
      // Q11: "What is the output of 'hello' + 'world'?"
      cy.get('h2').contains("What is the output of 'hello' + 'world'?").should('be.visible');
      cy.contains('.alert.alert-secondary', 'helloworld').prev('button').click();
  
      // Q12: "What does the range function do?"
      cy.get('h2').contains('What does the range function do?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'Generates a list of numbers').prev('button').click();
  
      // Q13: "What is the correct syntax to create a dictionary in Python?"
      cy.get('h2').contains('What is the correct syntax to create a dictionary in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', "{'name': 'John', 'age': 30}").prev('button').click();
  
      // Q14: "Which of the following can be used to create an empty list?"
      cy.get('h2').contains('Which of the following can be used to create an empty list in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', '[]').prev('button').click();
  
      // Q15: "What does the method append() do in a list?"
      cy.get('h2').contains('What does the method append() do in a list?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'Adds a new element at the end of the list').prev('button').click();
  
      // Q16: "How do you create a tuple in Python?"
      cy.get('h2').contains('How do you create a tuple in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', '()').prev('button').click();
  
      // Q17: "What is the output of print(3 == 3.0)?"
      cy.get('h2').contains('What is the output of print(3 == 3.0)?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'True').prev('button').click();
  
      // Q18: "What is the keyword to define a class in Python?"
      cy.get('h2').contains('What is the keyword to define a class in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'class').prev('button').click();
  
      // Q19: "Which of the following is not a built-in data type in Python?"
      cy.get('h2').contains('Which of the following is not a built-in data type in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', 'array').prev('button').click();
  
      // Q20: "How do you start a comment in Python?"
      cy.get('h2').contains('How do you start a comment in Python?').should('be.visible');
      cy.contains('.alert.alert-secondary', '#').prev('button').click();
  
      // After all questions are answered, the quiz should be completed
      cy.get('h2').contains('Quiz Completed').should('be.visible');
      cy.get('div').contains('Your score').should('be.visible');
  
      // Click "Take New Quiz"
      cy.contains('button', 'Take New Quiz').click();
    });
  
    it('should allow the user to start a new quiz', () => {
      // After taking a new quiz, ensure we can start again
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@fixtureQuestions');
  
    });
  });
  