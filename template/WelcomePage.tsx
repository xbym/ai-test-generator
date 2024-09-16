import React from 'react'
import { Button } from "./ui/button"
import Logo from './Logo'  // 导入 Logo 组件

interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <Logo />  {/* 添加 Logo 组件 */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            欢迎参加主义倾向测试
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            这个测试将帮助您了解自己的政治和社会观点倾向。测试包含一系列问题,大约需要10分钟完成。准备好开始探索您的思想了吗？
          </p>
          <Button 
            className="w-full py-4 text-lg font-semibold text-white bg-black rounded-lg shadow-md transition-colors duration-200 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
            onClick={onStart}
          >
            开始测试
          </Button>
        </div>
      </div>
    </div>
  )
}