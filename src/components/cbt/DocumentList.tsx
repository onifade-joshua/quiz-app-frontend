import { motion } from 'framer-motion'
import { Play, Pause, FileDown, BookOpen, Brain } from 'lucide-react'
import type { ImportedDocument } from '../../types'
import { downloadExplanation } from '../../utils/cbtHelpers'

interface DocumentListProps {
  documents: ImportedDocument[]
  selectedDocuments: string[]
  onDocumentSelect: (id: string) => void
  onStartCBT: () => void
  onImportMore: () => void
  isPlaying: Record<string, boolean>
  onPlayAudio: (url: string, id: string) => void
}

export default function DocumentList({
  documents,
  selectedDocuments,
  onDocumentSelect,
  onStartCBT,
  onImportMore,
  isPlaying,
  onPlayAudio
}: DocumentListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" />
          Your Documents ({documents.length})
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onImportMore}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-sm sm:text-base"
          >
            Import More
          </button>
          <button
            onClick={onStartCBT}
            disabled={selectedDocuments.length === 0}
            className={`px-4 sm:px-6 py-2 rounded-xl font-medium transition-all flex items-center justify-center text-sm sm:text-base ${
              selectedDocuments.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="hidden sm:inline">
              Start CBT Practice ({selectedDocuments.length})
            </span>
            <span className="sm:hidden">Start ({selectedDocuments.length})</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {documents.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4 text-sm sm:text-base">
            No documents uploaded yet
          </p>
          <button
            onClick={onImportMore}
            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm sm:text-base"
          >
            Upload Your First Document
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              className={`border rounded-xl p-3 sm:p-4 cursor-pointer transition-all ${
                selectedDocuments.includes(doc.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => onDocumentSelect(doc.id)}
              whileHover={{ y: -2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                {/* Left Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => onDocumentSelect(doc.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mr-2 sm:mr-3 w-4 h-4 text-blue-600 rounded flex-shrink-0"
                    />
                    {/* ✅ Truncate long filenames */}
                    <h3
                      className="font-semibold text-slate-900 text-sm sm:text-base truncate max-w-[160px] sm:max-w-[240px]"
                      title={doc.title}
                    >
                      {doc.title}
                    </h3>
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600 flex-shrink-0">
                      {doc.type}
                    </span>
                  </div>

                  {/* Explanation Preview */}
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 ml-6 sm:ml-7 line-clamp-2">
                    {doc.textExplanation?.slice(0, 150)}...
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 ml-6 sm:ml-7">
                    {doc.audioExplanation && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onPlayAudio(doc.audioExplanation!, doc.id)
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-xs sm:text-sm transition-colors"
                      >
                        {isPlaying[doc.id] ? (
                          <Pause className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        ) : (
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        )}
                        <span className="hidden sm:inline">Audio Explanation</span>
                        <span className="sm:hidden">Audio</span>
                      </button>
                    )}

                    {['txt', 'pdf', 'docx'].map((format) => (
                      <button
                        key={format}
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadExplanation(doc, format as any)
                        }}
                        className="flex items-center text-green-600 hover:text-green-800 text-xs sm:text-sm transition-colors"
                      >
                        <FileDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Info */}
                <div className="text-right sm:ml-4 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    {doc.subject}
                  </span>
                  <p className="text-xs text-slate-400">{doc.uploadedAt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
