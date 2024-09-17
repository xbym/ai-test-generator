import React from 'react';

interface WelcomeTemplateProps {
  title: string;
  description: string;
  startQuizFunction: () => void;
}

const WelcomeTemplate: React.FC<WelcomeTemplateProps> = ({ title, description, startQuizFunction }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">{title}</h1>
        <p className="text-lg text-gray-700 mb-8">{description}</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={startQuizFunction}
        >
          开始测试
        </button>
      </div>
    </div>
  );
};

export default WelcomeTemplate;