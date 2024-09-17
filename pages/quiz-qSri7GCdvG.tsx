
import React, { useState } from 'react';
import WelcomeTemplate from '../templates/WelcomeTemplate';
import QuestionTemplate from '../templates/QuestionTemplate';
import ResultTemplate from '../templates/ResultTemplate';

const quizData = {"title":"MBTI人格测试小测验","description":"本测试包含5个多选题，旨在帮助你更好地理解MBTI人格类型理论。请根据你的直觉选择最符合你性格的选项。","questions":[{"question":"在社交场合中，你通常更倾向于：","options":["与少数几个亲密的朋友深入交流","与许多人进行广泛的交流","观察他人并分析他们的行为","寻找机会展示自己的才华"],"correctAnswer":0},{"question":"当你面对一个新项目时，你首先会：","options":["制定详细的计划并按部就班地执行","根据直觉和灵感迅速开始行动","收集尽可能多的信息后再做决定","与团队成员讨论并听取他们的意见"],"correctAnswer":2},{"question":"在工作中，你更倾向于：","options":["独立完成任务，避免过多的团队合作","喜欢与团队成员紧密合作，共同完成任务","喜欢指导和领导团队，确保任务顺利完成","喜欢探索新方法和创新，即使这意味着冒险"],"correctAnswer":1},{"question":"当你遇到问题时，你通常会：","options":["立即采取行动，尝试解决问题","先冷静思考，分析问题的根源","寻求他人的建议和帮助","尝试从不同的角度看待问题，寻找创新解决方案"],"correctAnswer":1},{"question":"在日常生活中，你更倾向于：","options":["按照既定的习惯和规律生活","灵活调整计划，适应新的情况","喜欢探索新事物，尝试不同的体验","注重细节，确保每件事都完美无缺"],"correctAnswer":2}]};

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
