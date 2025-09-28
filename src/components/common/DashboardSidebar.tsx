import RecentActivitySection, { type Activity } from "../../components/common/RecentActivitySection"
import PerformanceInsightSection from "./PerformanceInsightSection"
import StudyGoalsSection from "./StudyGoalsSection"

interface Props {
  recentActivity: Activity[]
}

export default function DashboardSidebar({ recentActivity }: Props) {
  return (
    <div className="space-y-6">
      <RecentActivitySection recentActivity={recentActivity} />
      <PerformanceInsightSection />
      <StudyGoalsSection />
    </div>
  )
}
