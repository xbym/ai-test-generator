
import React, { useState } from 'react';
import WelcomeTemplate from '../templates/WelcomeTemplate';
import QuestionTemplate from '../templates/QuestionTemplate';
import ResultTemplate from '../templates/ResultTemplate';

const quizData = {"title":"MBTI人格测试小测验","description":"本测试包含5个多选题，旨在帮助你更好地理解MBTI人格类型理论。请根据你的直觉选择最符合你性格的选项。","questions":[{"question":"在社交场合中，你通常更倾向于：","options":["与少数几个亲密的朋友深入交流","与许多人轻松交谈，享受热闹的氛围","观察他人，思考他们的行为动机","寻找机会展示自己的才华和能力"],"correctAnswer":0},{"question":"当你面对一个新任务时，你更可能：","options":["立即开始行动，边做边想","先收集信息，制定详细的计划","与他人讨论，听取他们的意见","想象完成任务后的成就感"],"correctAnswer":1},{"question":"在团队合作中，你通常扮演的角色是：","options":["领导者，负责决策和指导","创意者，提出新颖的想法","协调者，确保团队和谐运作","执行者，负责具体任务的完成"],"correctAnswer":3},{"question":"你如何处理压力和挑战：","options":["通过运动或身体活动来释放压力","通过思考和分析问题来找到解决方案","通过与他人交流来获得支持和建议","通过放松和娱乐来缓解压力"],"correctAnswer":1},{"question":"在日常生活中，你更注重：","options":["实际的、可见的结果和成就","内心的感受和情感的满足","与他人的关系和社交互动","未来的规划和长远的目标"],"correctAnswer":0}]};

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
