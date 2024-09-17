import React from 'react';

interface QuestionTemplateProps {
  question: string;
  options: string[];
  currentQuestion: number;
  totalQuestions: number;
  onAnswerFunction: (index: number) => void;
}

const QuestionTemplate: React.FC<QuestionTemplateProps> = ({ question, options, currentQuestion, totalQuestions, onAnswerFunction }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">问题 {currentQuestion} / {totalQuestions}</h2>
        <p className="text-lg text-gray-700 mb-8">{question}</p>
        <div className="space-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => onAnswerFunction(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTemplate;