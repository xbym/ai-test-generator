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

function generatePrompt(topic: string): string {
  return `
请为以下主题创建一个包含5个多选题的测试：${topic}

请按照以下格式生成内容：
标题：[测试标题]
描述：[简短的测试描述]

1. [问题1]
A. [选项A]
B. [选项B]
C. [选项C]
D. [选项D]
正确答案：[正确选项的字母]

2. [问题2]
A. [选项A]
B. [选项B]
C. [选项C]
D. [选项D]
正确答案：[正确选项的字母]

... (重复到第5个问题)

请确保问题难度适中，选项合理，并提供正确答案。
`;
}

function parseGeneratedContent(content: string) {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const title = lines[0].replace('标题：', '').trim();
  const description = lines[1].replace('描述：', '').trim();
  const questions = [];

  for (let i = 2; i < lines.length; i += 6) {
    if (i + 5 < lines.length) {
      const question = lines[i].replace(/^\d+\.\s*/, '').trim();
      const options = [
        lines[i+1].replace(/^A\.\s*/, '').trim(),
        lines[i+2].replace(/^B\.\s*/, '').trim(),
        lines[i+3].replace(/^C\.\s*/, '').trim(),
        lines[i+4].replace(/^D\.\s*/, '').trim()
      ];
      const correctAnswer = lines[i+5].replace('正确答案：', '').trim().charCodeAt(0) - 65; // 将A-D转换为0-3

      questions.push({ question, options, correctAnswer });
    }
  }

  return { title, description, questions };
}