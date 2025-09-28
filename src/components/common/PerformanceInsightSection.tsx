import { TrendingUp, Star } from "lucide-react"

export default function PerformanceInsightSection() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Performance Insight</h3>
        <TrendingUp className="w-5 h-5" />
      </div>
      <p className="text-sm opacity-90 mb-4">
        Your practice accuracy has improved by 23% this week. Keep up the great work!
      </p>
      <div className="flex items-center space-x-2">
        <Star className="w-4 h-4 fill-current" />
        <span className="text-sm font-semibold">87% Average Score</span>
      </div>
    </div>
  )
}
