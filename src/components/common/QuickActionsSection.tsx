import React from "react"
import { motion } from "framer-motion"

export interface QuickAction {
  title: string
  description: string
  icon: React.ElementType
  gradient: string
  difficulty: string
  route: string
}

interface Props {
  quickActions: QuickAction[]
}

export default function QuickActionsSection({ quickActions }: Props) {
  return (
    <div className="mt-6 sm:mt-8">
      {/* Section Title */}
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
        Quick Actions
      </h3>

      {/* Grid Container */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-4 sm:gap-6
        "
      >
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            className="
              bg-white 
              rounded-2xl 
              p-4 sm:p-6 
              shadow-sm 
              border border-slate-100 
              text-left 
              hover:shadow-lg 
              transition-all 
              duration-300 
              group
              w-full
            "
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Icon */}
            <div
              className={`
                w-10 h-10 sm:w-12 sm:h-12 
                rounded-xl 
                bg-gradient-to-r ${action.gradient} 
                flex items-center justify-center 
                mb-3 sm:mb-4 
                group-hover:scale-110 
                transition-transform
              `}
            >
              <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>

            {/* Title */}
            <h4 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
              {action.title}
            </h4>

            {/* Description */}
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mb-2 sm:mb-3">
              {action.description}
            </p>

            {/* Difficulty Tag */}
            <span
              className="
                text-[10px] sm:text-xs 
                bg-slate-100 
                text-slate-700 
                px-2 py-1 
                rounded-full
              "
            >
              {action.difficulty}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
