
export default function StudyGoalsSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="font-bold text-slate-900 mb-4">Today's Goals</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-700">Practice Questions</span>
          <span className="text-sm font-semibold text-blue-600">8/10</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: "80%" }}
          ></div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-slate-700">Study Time</span>
          <span className="text-sm font-semibold text-green-600">2.5/3 hrs</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: "83%" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
