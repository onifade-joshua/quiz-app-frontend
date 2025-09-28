import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ChevronRight, Plus } from "lucide-react"

export interface DocumentType {
  title: string
  description: string
  icon: React.ElementType
  color: string
  borderColor: string
  hoverColor: string
}

interface Props {
  documentTypes: DocumentType[]
}

export default function DocumentImportSection({ documentTypes }: Props) {
  const navigate = useNavigate()

  const handleDocumentTypeClick = () => {
    navigate('/cbt-practice')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Import & Analyze Documents
          </h3>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base">
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          Choose your preferred method to import study materials
        </p>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentTypes.map((type, index) => (
            <motion.button
              key={type.title}
              onClick={handleDocumentTypeClick}
              className={`p-4 border-2 ${type.borderColor} rounded-xl text-left transition-all duration-300 ${type.hoverColor} group w-full`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <type.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">
                    {type.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                    {type.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}