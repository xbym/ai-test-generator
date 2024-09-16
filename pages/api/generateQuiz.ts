import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepSeekAPI } from '../../utils/deepseek';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { topic } = req.body;
      const deepseek = new DeepSeekAPI();
      
      const prompt = generatePrompt(topic);
      const generatedContent = await deepseek.generateContent(prompt);
      
      const quizData = parseGeneratedContent(generatedContent);
      
      res.status(200).json({ quizData });
    } catch (error) {
      res.status(500).json({ error: '生成测试失败' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// generatePrompt 和 parseGeneratedContent 函数保持不变