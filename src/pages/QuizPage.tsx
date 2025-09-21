import React, { useEffect, useState } from 'react';
import { quizAPI } from '../services/api';
import type { Question, QuizAnswer, QuizResult } from '../types';
import { Button } from '../components/common/Button';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizResults } from '../components/quiz/QuizResults';
import { Timer } from '../components/quiz/Timer';
import toast from 'react-hot-toast';

export const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const data = await quizAPI.start();
      setQuestions(data);
      setStartTime(Date.now());
      setAnswers([]);
      setResult(null);
      setCurrentIndex(0);
      setIsTimerActive(true);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, selectedAnswer: number) => {
    setAnswers(prev => {
      const exists = prev.find(a => a.questionId === questionId);
      if (exists) return prev.map(a => a.questionId === questionId ? { ...a, selectedAnswer } : a);
      return [...prev, { questionId, selectedAnswer }];
    });
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNextOrSubmit = async () => {
    const isLastQuestion = currentIndex === questions.length - 1;

    if (isLastQuestion) {
      // Confirm before submit
      const confirmSubmit = window.confirm('Are you sure you want to submit the quiz?');
      if (!confirmSubmit) return;

      const timeElapsed = Math.floor((Date.now() - startTime) / 1000);

      try {
        const data = await quizAPI.submit({ answers, timeElapsed });
        setResult(data);
        setIsTimerActive(false);
      } catch (err) {
        console.error(err);
        toast.error('Failed to submit quiz');
      }
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (loading) return <p>Loading quiz...</p>;

  if (result) {
    return (
      <QuizResults
        result={result}
        onRetakeQuiz={fetchQuiz}
        onBackToQuestions={() => window.location.href = '/questions'}
      />
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="space-y-6">
      <Timer
        startTime={startTime}
        isActive={isTimerActive}
        duration={300} // 5 minutes
        onTimeUp={handleNextOrSubmit}
      />

      {currentQuestion && (
        <QuizQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={answers.find(a => a.questionId === currentQuestion.id)?.selectedAnswer}
          onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion.id, answer)}
        />
      )}

      <div className="flex justify-between mt-4 max-w-2xl mx-auto">
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </Button>

        <Button onClick={handleNextOrSubmit}>
          {currentIndex === questions.length - 1 ? 'Submit Quiz' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
