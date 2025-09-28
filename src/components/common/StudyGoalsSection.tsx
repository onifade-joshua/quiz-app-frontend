export default function StudyGoalsSection() {
  return (
    <div
      className="
        bg-white 
        rounded-2xl 
        shadow-sm 
        border border-slate-100 
        p-4 sm:p-6
      "
    >
      {/* Header */}
      <h3 className="font-bold text-slate-900 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
        Today's Goals
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {/* Practice Questions */}
        <div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between">
            <span className="text-xs sm:text-sm md:text-base text-slate-700">
              Practice Questions
            </span>
            <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-600 mt-1 xs:mt-0">
              8/10
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "80%" }}
            />
          </div>
        </div>

        {/* Study Time */}
        <div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-2">
            <span className="text-xs sm:text-sm md:text-base text-slate-700">
              Study Time
            </span>
            <span className="text-xs sm:text-sm md:text-base font-semibold text-green-600 mt-1 xs:mt-0">
              2.5/3 hrs
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "83%" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
