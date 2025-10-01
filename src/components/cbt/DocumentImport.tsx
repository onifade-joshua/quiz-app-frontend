import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Type,
  Camera,
  FileImage,
  Mic,
  Edit3,
  FileText,
  Send,
  Loader
} from 'lucide-react'

export type DocumentType =
  | 'text'
  | 'screenshot'
  | 'image'
  | 'audio'
  | 'handwritten'
  | 'file'

interface DocumentImportProps {
  onProcessComplete: (files: Record<DocumentType, File>) => void
}

export default function DocumentImport({ onProcessComplete }: DocumentImportProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Partial<Record<DocumentType, File>>>({})
  const [processing, setProcessing] = useState(false)

  const handleFileUpload = (type: DocumentType, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [type]: file }))
  }

  const processDocuments = async () => {
    setProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    onProcessComplete(uploadedFiles as Record<DocumentType, File>)
    setUploadedFiles({})
    setProcessing(false)
  }

  const documentTypes: {
    type: DocumentType
    title: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    accept: string
  }[] = [
    { type: 'text', title: 'Text Document', icon: Type, color: 'bg-blue-100 text-blue-600', accept: '.txt,.doc,.docx' },
    { type: 'screenshot', title: 'Screenshot', icon: Camera, color: 'bg-green-100 text-green-600', accept: 'image/*' },
    { type: 'image', title: 'Image', icon: FileImage, color: 'bg-purple-100 text-purple-600', accept: 'image/*' },
    { type: 'audio', title: 'Audio', icon: Mic, color: 'bg-red-100 text-red-600', accept: 'audio/*' },
    { type: 'handwritten', title: 'Handwritten', icon: Edit3, color: 'bg-yellow-100 text-yellow-600', accept: 'image/*' },
    { type: 'file', title: 'File Upload', icon: FileText, color: 'bg-indigo-100 text-indigo-600', accept: '.pdf,.doc,.docx' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100"
    >
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">Import Documents</h2>
      <p className="text-slate-600 mb-4 sm:mb-6 text-xs sm:text-sm">
        Upload your study materials in any format
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {documentTypes.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.type}
              className={`p-3 sm:p-4 rounded-xl border-2 border-dashed ${item.color} border-opacity-30 relative hover:border-opacity-50 transition-all`}
            >
              <input
                type="file"
                accept={item.accept}
                onChange={(e) => e.target.files?.[0] && handleFileUpload(item.type, e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Icon className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 ${item.color}`} />
              <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">{item.title}</h3>
              <p className="text-xs text-slate-500 mb-2">Click to upload</p>
              {uploadedFiles[item.type] && (
                <p className="text-xs sm:text-sm text-green-600 mt-2 font-medium truncate">
                  ✓ {uploadedFiles[item.type]?.name}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={processDocuments}
        disabled={Object.keys(uploadedFiles).length === 0 || processing}
        className={`w-full py-2.5 sm:py-3 rounded-xl font-medium transition-all flex items-center justify-center text-sm sm:text-base ${
          Object.keys(uploadedFiles).length > 0 && !processing
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        {processing ? (
          <>
            <Loader className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
            Processing Documents...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Process {Object.keys(uploadedFiles).length} Document
            {Object.keys(uploadedFiles).length !== 1 ? 's' : ''}
          </>
        )}
      </button>
    </motion.div>
  )
}
