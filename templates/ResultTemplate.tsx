import React from 'react';

interface ResultTemplateProps {
  score: number;
  totalQuestions: number;
  restartQuizFunction: () => void;
}

const ResultTemplate: React.FC<ResultTemplateProps> = ({ score, totalQuestions, restartQuizFunction }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-2xl font-semibold mb-4 text-center">测试结果</h2>
          <p className="mb-4 text-center">你的得分是: {score} / {totalQuestions}</p>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={restartQuizFunction}
          >
            重新开始
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultTemplate;