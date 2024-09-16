import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { quizData } = req.body;
      const quizId = await generateQuizPage(quizData);
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

async function generateQuizPage(quizData: any) {
  const quizId = nanoid(10);
  const mainPageContent = `
    // ... 这里是您之前的 React 组件代码
  `;

  const fileName = `quiz-${quizId}.tsx`;
  const filePath = path.join(process.cwd(), 'pages', fileName);

  fs.writeFileSync(filePath, mainPageContent);

  return quizId;
}