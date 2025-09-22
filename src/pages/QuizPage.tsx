import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import Timer from "../components/quiz/Timer";
import { QuizQuestion } from "../components/quiz/QuizQuestion";
import { quizAPI } from "../services/api";

const QuizPage: React.FC = () => {
  const {
    currentQuiz,
    setCurrentQuiz,
    answers,
    setAnswer,
    startTime,
    isQuizActive,
    endQuiz,
  } = useStore();

  const [result, setResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    timeElapsed: number;
  } | null>(null);

  // Load questions when quiz starts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await quizAPI.start();
        setCurrentQuiz(data);
      } catch (err) {
        console.error("Error fetching quiz questions:", err);
      }
    };

    if (isQuizActive && currentQuiz.length === 0) {
      fetchQuestions();
    }
  }, [isQuizActive, currentQuiz.length, setCurrentQuiz]);

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    const state = useStore.getState();
    const timeElapsed = Math.floor(
      (Date.now() - (state.startTime ?? 0)) / 1000
    );

    try {
      const res = await quizAPI.submit({
        userId: state.user?.id ?? "USER_ID_HERE",
        answers: state.answers,
        timeElapsed,
        totalQuestions: state.currentQuiz.length,
      });

      setResult(res.result);
      endQuiz();
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  // Show results after quiz
  if (result) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
        <p>
          Score: {result.score}/{result.total}
        </p>
        <p>Percentage: {result.percentage.toFixed(2)}%</p>
        <p>Time Taken: {result.timeElapsed}s</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {isQuizActive && (
        <Timer
          startTime={startTime!}
          duration={300} // 5 minutes
          isActive={isQuizActive}
          onTimeUp={handleSubmitQuiz}
        />
      )}

      {/* Render quiz questions */}
      {currentQuiz.map((q, index) => {
        const selected = answers.find((a) => a.questionId === q.id)?.selectedAnswer;
        return (
          <QuizQuestion
            key={q.id}
            question={q}
            selectedAnswer={selected}
            onAnswerSelect={(answer) => setAnswer(q.id, answer)}
            questionNumber={index + 1}
            totalQuestions={currentQuiz.length}
          />
        );
      })}

      {isQuizActive && currentQuiz.length > 0 && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
          onClick={handleSubmitQuiz}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default QuizPage;
