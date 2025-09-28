import RecentActivitySection, { type Activity } from "../../components/common/RecentActivitySection"
import PerformanceInsightSection from "./PerformanceInsightSection"
import StudyGoalsSection from "./StudyGoalsSection"

interface Props {
  recentActivity: Activity[]
}

export default function DashboardSidebar({ recentActivity }: Props) {
  return (
    <div
      className="
        w-full 
        space-y-6 
        sm:space-y-8 
        lg:space-y-10
      "
    >
      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
        <RecentActivitySection recentActivity={recentActivity} />
      </div>

      {/* Performance Insight */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
        <PerformanceInsightSection />
      </div>

      {/* Study Goals */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
        <StudyGoalsSection />
      </div>
    </div>
  )
}
