import React, { useState } from 'react'
import type { NextPage } from 'next'
import { ArrowRight, Loader2 } from 'lucide-react'

const Home: NextPage = () => {
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([])
  const [generatedQuizUrl, setGeneratedQuizUrl] = useState('')

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })
      const data = await response.json()
      setGeneratedLink(data.link)
      setGeneratedQuestions(data.questions)
    } catch (error) {
      console.error('Error generating test:', error)
      alert('生成测试时出错,请稍后再试。')
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleGenerateQuiz() {
    try {
      // 第一步：生成测试内容
      const response1 = await fetch('/api/generateQuiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: quizTopic }),
      });
      const data1 = await response1.json();

      if (!response1.ok) throw new Error(data1.error);

      // 第二步：创建测试页面
      const response2 = await fetch('/api/createQuizPage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizData: data1.quizData }),
      });
      const data2 = await response2.json();

      if (!response2.ok) throw new Error(data2.error);

      // 设置生成的测试 URL
      setGeneratedQuizUrl(data2.quizUrl);
    } catch (error) {
      console.error('Error generating quiz:', error);
      // 处理错误...
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8 text-center animate-fade-in-down">
          AI测试网站生成器
        </h1>
        
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 space-y-6 animate-fade-in-up">
          <textarea
            className="w-full h-40 p-4 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
            placeholder="请描述您想要生成的测试类型,例如: MBTI人格测试"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <button
            className={`w-full py-3 px-6 text-white rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleGenerate}
            disabled={isGenerating || !description.trim()}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={24} />
                生成中...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                生成测试
                <ArrowRight className="ml-2" size={24} />
              </span>
            )}
          </button>
          
          {generatedLink && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded animate-fade-in mt-4">
              <p className="font-bold">测试已生成!</p>
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {generatedLink}
              </a>
              <div className="mt-4">
                <p className="font-bold">生成的问题:</p>
                <ul className="list-decimal pl-5">
                  {generatedQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>&copy; 2023 AI测试网站生成器. 保留所有权利.</p>
      </footer>
    </div>
  )
}

export default Home