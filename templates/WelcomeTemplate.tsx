import React from 'react';

interface WelcomeTemplateProps {
  title: string;
  description: string;
  startQuizFunction: () => void;
}

const WelcomeTemplate: React.FC<WelcomeTemplateProps> = ({ title, description, startQuizFunction }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
          <p className="mb-8 text-center">{description}</p>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startQuizFunction}
          >
            开始测试
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTemplate;