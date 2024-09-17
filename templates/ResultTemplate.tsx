import React from 'react';

interface ResultTemplateProps {
  score: number;
  totalQuestions: number;
  restartQuizFunction: () => void;
}

const ResultTemplate: React.FC<ResultTemplateProps> = ({ score, totalQuestions, restartQuizFunction }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">测试结果</h2>
        <p className="text-lg text-gray-700 mb-8">你的得分是: {score} / {totalQuestions}</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={restartQuizFunction}
        >
          重新开始
        </button>
      </div>
    </div>
  );
};

export default ResultTemplate;