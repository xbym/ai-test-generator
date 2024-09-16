
import React, { useState } from 'react';
import WelcomeTemplate from '../templates/WelcomeTemplate';
import QuestionTemplate from '../templates/QuestionTemplate';
import ResultTemplate from '../templates/ResultTemplate';

const quizData = {"title":"MBTI人格测试小测验","description":"本测试包含5个多选题，旨在帮助你更好地理解MBTI人格类型理论。请根据你的直觉选择最符合你性格的选项。","questions":[{"question":"在社交场合中，你通常更倾向于：","options":["与少数几个亲密的朋友深入交流","与许多人进行广泛的互动","观察他人并分析他们的行为","根据场合调整自己的社交方式"],"correctAnswer":0},{"question":"当你面对一个新项目时，你更可能：","options":["立即开始行动，边做边想","先制定详细的计划，然后按计划执行","寻求他人的意见和建议","先观察一段时间，再决定如何行动"],"correctAnswer":1},{"question":"在团队合作中，你通常扮演的角色是：","options":["领导者，负责决策和指导","协调者，确保团队成员之间的和谐","创意者，提供新颖的想法和解决方案","执行者，负责具体任务的完成"],"correctAnswer":2},{"question":"当你遇到问题时，你通常会：","options":["立即采取行动解决问题","先分析问题的根源，再制定解决方案","寻求他人的帮助和建议","暂时搁置问题，等待更好的时机"],"correctAnswer":1},{"question":"在日常生活中，你更倾向于：","options":["按照既定的习惯和规律生活","灵活调整自己的计划以适应变化","追求新鲜和刺激的体验","保持内心的平静和稳定"],"correctAnswer":0}]};

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
