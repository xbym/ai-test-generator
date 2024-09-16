import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1'
});

type Data = {
  link: string
  questions: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const testDescription = req.body.description

    try {
      const response = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是一个专业的测试设计师,擅长创建各种类型的测试题目。"
          },
          {
            role: "user",
            content: `根据以下描述创建5个测试题目: ${testDescription}`
          }
        ],
        stream: false
      })

      const questions = response.choices[0].message.content?.split('\n').filter(q => q.trim() !== '') || []

      // 这里应该有保存测试到数据库的逻辑,并生成唯一的URL
      const testId = Date.now().toString()
      const link = `https://example.com/test/${testId}`

      res.status(200).json({ link, questions })
    } catch (error) {
      console.error('Error generating test:', error)
      res.status(500).json({ link: '', questions: [] })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}