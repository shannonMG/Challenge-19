import { useState, } from 'react';
import type { Question } from '../models/Question.js';
import { getQuestions } from '../services/questionApi.js';

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const getRandomQuestions = async () => {
    try {
      const questions = await getQuestions();

      if (!questions) {
        throw new Error('something went wrong!');
      }

      setQuestions(questions);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    await getRandomQuestions();
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button  data-cy="start-quiz-btn" className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center" data-cy= "quiz-completed">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success" data-cy= "quiz-score">
          Your score: {score}/{questions.length}
        </div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Take New Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" data-cy="loading-screen">
        <div className="spinner-border text-primary" data-cy= "loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='card p-4'>
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
      {currentQuestion.answers.map((answer, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <button className="btn btn-primary" data-cy={`answer-button-${index}`} onClick={() => handleAnswerClick(answer.isCorrect)}>{index + 1}</button>
          <div className="alert alert-secondary mb-0 ms-2 flex-grow-1" data-cy={`answer-text-${index}`}>{answer.text}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Quiz;
