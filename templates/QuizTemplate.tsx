import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizTemplateProps {
  title: string;
  description: string;
  questions: Question[];
}

const QuizTemplate: React.FC<QuizTemplateProps> = ({ title, description, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));

  const handleAnswer = (selectedAnswer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    const newScore = answers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(-1));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
          <p className="mb-8 text-center">{description}</p>
          
          {!showResult ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">问题 {currentQuestion + 1} / {questions.length}</h2>
              <p className="mb-4">{questions[currentQuestion].question}</p>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="w-full p-2 text-left bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">测试结果</h2>
              <p className="mb-4">你的得分是: {score} / {questions.length}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={restartQuiz}
              >
                重新开始
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTemplate;