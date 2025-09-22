import React, { useState } from "react";
import { useStore } from "../store/useStore";
import Timer from "../components/quiz/Timer";
import { quizAPI } from "../services/api";

const QuizPage: React.FC = () => {
  const { startTime, isQuizActive, endQuiz } = useStore();
  const [result, setResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    timeElapsed: number;
  } | null>(null);

  const handleSubmitQuiz = async () => {
    const state = useStore.getState();
    const timeElapsed = Math.floor((Date.now() - (state.startTime ?? 0)) / 1000);

    try {
      const res = await quizAPI.submit({
        userId: "USER_ID_HERE", // TODO: replace with logged-in user
        answers: state.answers,
        timeElapsed,
        totalQuestions: state.questions.length,
      });

      setResult(res.result);
      endQuiz();
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  if (result) {
    return (
      <div>
        <h2>Quiz Results</h2>
        <p>Score: {result.score}/{result.total}</p>
        <p>Percentage: {result.percentage.toFixed(2)}%</p>
        <p>Time Taken: {result.timeElapsed}s</p>
      </div>
    );
  }

  return (
    <div>
      {isQuizActive && (
        <Timer
          startTime={startTime!}
          duration={300} // 5 minutes
          isActive={isQuizActive}
          onTimeUp={handleSubmitQuiz}
        />
      )}

      {/* TODO: render questions here */}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmitQuiz}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
