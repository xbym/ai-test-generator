import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  title: string;
  description: string;
  questions: Question[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { quizData } = req.body;
      const quizId = await generateQuizPage(quizData as QuizData);
      const quizUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/quiz-${quizId}`;
      res.status(200).json({ quizUrl });
    } catch (error) {
      res.status(500).json({ error: '创建测试页面失败' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function generateQuizPage(quizData: QuizData) {
  const quizId = nanoid(10);
  const mainPageContent = `
import React, { useState } from 'react';
import WelcomeTemplate from '../templates/WelcomeTemplate';
import QuestionTemplate from '../templates/QuestionTemplate';
import ResultTemplate from '../templates/ResultTemplate';

const quizData = ${JSON.stringify(quizData)};

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
`;

  const fileName = `quiz-${quizId}.tsx`;
  const filePath = path.join(process.cwd(), 'pages', fileName);

  fs.writeFileSync(filePath, mainPageContent);

  return quizId;
}