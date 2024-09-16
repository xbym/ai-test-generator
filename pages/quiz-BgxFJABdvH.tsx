
import React, { useState } from 'react';
import WelcomeTemplate from '../templates/WelcomeTemplate';
import QuestionTemplate from '../templates/QuestionTemplate';
import ResultTemplate from '../templates/ResultTemplate';

const quizData = {"title":"MBTI人格测试小测验","description":"本测试包含5个多选题，旨在帮助你更好地理解MBTI人格类型理论。请根据你的直觉选择最符合你性格的选项。","questions":[{"question":"在社交场合中，你通常更倾向于：","options":["与少数几个亲密的朋友深入交流","与一大群人轻松互动","观察他人并分析他们的行为","寻找机会展示自己的才华"],"correctAnswer":0},{"question":"当你面对一个新项目时，你首先会：","options":["制定详细的计划并按部就班地执行","凭直觉快速开始，边做边调整","与团队成员讨论并集思广益","分析项目的潜在风险和收益"],"correctAnswer":3},{"question":"在日常生活中，你更倾向于：","options":["按照既定的日程表行事","根据当下的感觉和灵感行事","与他人合作完成任务","独立完成任务并追求完美"],"correctAnswer":1},{"question":"当你遇到冲突时，你通常会：","options":["冷静分析问题并寻求解决方案","表达自己的感受并寻求理解","避免冲突并寻找妥协的方法","直接面对冲突并争取自己的立场"],"correctAnswer":0},{"question":"在选择职业时，你更看重：","options":["工作的稳定性和安全性","工作的创造性和自由度","与他人合作的机会","工作的挑战性和成就感"],"correctAnswer":3}]};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [score, setScore] = useState(0);

  const startQuiz = () => setCurrentQuestion(0);

  const handleAnswer = (index: number) => {
    if (index === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(-2); // Show result page
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(-1);
    setScore(0);
  };

  if (currentQuestion === -1) {
    return <WelcomeTemplate 
      title={quizData.title}
      description={quizData.description}
      startQuizFunction={startQuiz}
    />;
  } else if (currentQuestion >= 0 && currentQuestion < quizData.questions.length) {
    return <QuestionTemplate 
      question={quizData.questions[currentQuestion].question}
      options={quizData.questions[currentQuestion].options}
      currentQuestion={currentQuestion + 1}
      totalQuestions={quizData.questions.length}
      onAnswerFunction={handleAnswer}
    />;
  } else {
    return <ResultTemplate 
      score={score}
      totalQuestions={quizData.questions.length}
      restartQuizFunction={restartQuiz}
    />;
  }
};

export default Quiz;
