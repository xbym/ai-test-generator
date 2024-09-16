import React, { useState } from 'react'
import type { NextPage } from 'next'
import { ArrowRight, Loader2 } from 'lucide-react'

const Home: NextPage = () => {
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')

  const handleGenerate = () => {
    setIsGenerating(true)
    // 模拟生成过程
    setTimeout(() => {
      setGeneratedLink('https://example.com/generated-test')
      setIsGenerating(false)
    }, 3000)
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
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded animate-fade-in">
              <p className="font-bold">测试已生成!</p>
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {generatedLink}
              </a>
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