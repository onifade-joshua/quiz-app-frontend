import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Lock, CheckCircle, CreditCard, Shield, Building2, AlertCircle } from 'lucide-react'

interface PaymentModalProps {
  onClose: () => void
  onPaymentSuccess: () => void
  trialsUsed?: number
}

export default function PaymentModal({ onClose, onPaymentSuccess, trialsUsed = 0 }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDummyPayment = () => {
    setIsProcessing(true)
    
    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccess(true)
      
      setTimeout(() => {
        onPaymentSuccess()
      }, 1500)
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
          <p className="text-slate-600">Activating your premium access...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Subscribe to Premium
          </h2>
          <p className="text-slate-600">
            Unlock unlimited CBT practice sessions
          </p>
        </div>

        {trialsUsed >= 5 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-900 text-sm mb-1">Free Trial Limit Reached</h4>
                <p className="text-orange-700 text-xs">
                  You have used all {trialsUsed} free trials. Subscribe now to continue practicing without limits.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
          <h3 className="font-semibold text-slate-900 mb-4 text-center">Premium Features</h3>
          <div className="space-y-3">
            {[
              'Unlimited practice questions',
              'Detailed answer explanations',
              'Performance analytics & tracking',
              'Audio explanations for learning',
              'Download explanations (PDF, TXT, DOCX)',
              'Mock exam simulations',
              'Lifetime access - Pay once, use forever'
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-xl">₦</span>
              <span className="text-5xl font-bold">2,000</span>
            </div>
            <p className="text-slate-300 text-sm mb-1">One-time payment</p>
            <p className="text-slate-400 text-xs">Lifetime access • No recurring fees</p>
          </div>
        </div>

        <button
          onClick={handleDummyPayment}
          disabled={isProcessing}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4 shadow-lg"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pay with Paystack
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4 mb-4 text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" />
            <span>Card</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-400" />
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            <span>Bank Transfer</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
          <Shield className="w-4 h-4" />
          <span>Secured by Paystack • SSL Encrypted</span>
        </div>

        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800 text-center font-medium">
            TEST MODE: Dummy payment for testing purposes
          </p>
        </div>
      </motion.div>
    </div>
  )
}