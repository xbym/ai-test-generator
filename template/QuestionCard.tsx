import { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { motion } from "framer-motion"
import { Option } from '../data/questions';

interface QuestionCardProps {
  question: string;
  options: Option[];
  onSelect: (optionId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOptionId: string | null;
}

export default function QuestionCard({ 
  question, 
  options, 
  onSelect, 
  onPrevious, 
  onNext,
  currentQuestionIndex, 
  totalQuestions,
  selectedOptionId
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  useEffect(() => {
    const index = options.findIndex(option => option.id === selectedOptionId);
    setSelectedOption(index !== -1 ? index : null);
  }, [selectedOptionId, options]);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    onSelect(options[index].id);
  }

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-xl shadow-lg"
      >
        <div className="space-y-4">
          <Progress 
            value={((currentQuestionIndex + 1) / totalQuestions) * 100} 
            className="w-full h-2 bg-gray-200"
          />
          <p className="text-sm text-gray-500 text-right">问题 {currentQuestionIndex + 1} / {totalQuestions}</p>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{question}</h2>
        
        <div className="space-y-4">
          {options.map((option, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className={`w-full py-4 text-lg justify-start transition-colors duration-200
                  ${selectedOption === index 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                onClick={() => handleSelect(index)}
              >
                {option.text}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className={`bg-white text-black border-gray-300 ${
              isFirstQuestion ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            上一题
          </Button>
          <Button 
            variant="outline"
            onClick={onNext}
            disabled={selectedOption === null}
            className={`bg-white text-black border-gray-300 ${
              selectedOption !== null ? 'hover:bg-black hover:text-white' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? "完成" : "下一题"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}