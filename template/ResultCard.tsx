import { Button } from "./ui/button"
import { Progress } from "./ui/progress"

interface ResultCardProps {
  philosopher: string;
  description: string;
  onRetake: () => void;
}

export default function ResultCard({ philosopher, description, onRetake }: ResultCardProps) {
  const results = [
    { ideology: philosopher, percentage: 100 },
    // 你可以根据需要添加更多结果
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          您的测试结果
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-xl text-gray-700">您最倾向的哲学家是</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{philosopher}</p>
        </div>
        
        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">{result.ideology}</span>
                <span className="text-lg font-bold text-blue-600">{result.percentage}%</span>
              </div>
              <Progress value={result.percentage} className="h-4" />
            </div>
          ))}
        </div>
        
        <p className="text-gray-600 mt-6">{description}</p>
        
        <div className="mt-12 text-center">
          <Button className="px-8 py-3 text-lg" onClick={onRetake}>
            重新测试
          </Button>
        </div>
      </div>
    </div>
  )
}