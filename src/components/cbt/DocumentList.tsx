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
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-green-600" />
          Your Documents ({documents.length})
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onImportMore}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Import More
          </button>
          <button
            onClick={onStartCBT}
            disabled={selectedDocuments.length === 0}
            className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center ${
              selectedDocuments.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Brain className="w-5 h-5 mr-2" />
            Start CBT Practice ({selectedDocuments.length})
          </button>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No documents uploaded yet</p>
          <button
            onClick={onImportMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Upload Your First Document
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                selectedDocuments.includes(doc.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => onDocumentSelect(doc.id)}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => onDocumentSelect(doc.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mr-3 w-4 h-4 text-blue-600 rounded"
                    />
                    <h3 className="font-semibold text-slate-900">{doc.title}</h3>
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                      {doc.type}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-3 ml-7">
                    {doc.textExplanation?.slice(0, 150)}...
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 ml-7">
                    {doc.audioExplanation && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onPlayAudio(doc.audioExplanation!, doc.id)
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm transition-colors"
                      >
                        {isPlaying[doc.id] ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                        Audio Explanation
                      </button>
                    )}
                    
                    {['txt', 'pdf', 'docx'].map(format => (
                      <button
                        key={format}
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadExplanation(doc, format as any)
                        }}
                        className="flex items-center text-green-600 hover:text-green-800 text-sm transition-colors"
                      >
                        <FileDown className="w-4 h-4 mr-1" />
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <span className="text-sm font-medium text-slate-700">{doc.subject}</span>
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