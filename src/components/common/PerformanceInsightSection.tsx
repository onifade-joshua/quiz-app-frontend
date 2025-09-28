import { TrendingUp, Star } from "lucide-react"

export default function PerformanceInsightSection() {
  return (
    <div
      className="
        bg-gradient-to-br from-blue-500 to-purple-600 
        rounded-2xl 
        p-4 sm:p-6 
        text-white 
        shadow-sm
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
        <h3 className="font-bold text-base sm:text-lg md:text-xl">
          Performance Insight
        </h3>
        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm md:text-base opacity-90 mb-4 leading-relaxed">
        Your practice accuracy has improved by{" "}
        <span className="font-semibold">23%</span> this week. Keep up the great
        work!
      </p>

      {/* Score Section */}
      <div className="flex items-center space-x-2">
        <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
        <span className="text-xs sm:text-sm md:text-base font-semibold">
          87% Average Score
        </span>
      </div>
    </div>
  )
}
