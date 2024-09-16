import React, { useState, useCallback } from 'react';
import WelcomePage from './components/WelcomePage';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import { questions } from './data/questions';
import { philosophers } from './data/philosophers';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 表示欢迎页
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = currentQuestionIndex >= 0 ? questions[currentQuestionIndex] : null;

  const handleStart = useCallback(() => {
    setCurrentQuestionIndex(0);
  }, []);

  const handleSelect = useCallback((optionId: string) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = optionId;
      return newAnswers;
    });
  }, [currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setShowResult(true);
    }
  }, [currentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1));
  }, []);

  const handleRetake = useCallback(() => {
    setCurrentQuestionIndex(-1);
    setAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
  }, []);

  const calculateResult = useCallback(() => {
    // 这里实现计算结果的逻辑
    // 返回一个哲学家对象
    return philosophers[0]; // 这里只是一个示例
  }, [answers]);

  if (currentQuestionIndex === -1) {
    return <WelcomePage onStart={handleStart} />;
  }

  if (showResult) {
    const result = calculateResult();
    return <ResultCard philosopher={result.name} description={result.description} onRetake={handleRetake} />;
  }

  return (
    <QuestionCard
      question={currentQuestion!.text}
      options={currentQuestion!.options}
      onSelect={handleSelect}
      onPrevious={handlePrevious}
      onNext={handleNext}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      selectedOptionId={answers[currentQuestionIndex]}
    />
  );
}

export default App;
