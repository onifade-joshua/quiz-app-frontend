import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"

interface Message {
  sender: "user" | "bot" | "agent"
  text: string
}

interface SupportChatProps {
  isOpen: boolean
  onClose: () => void
}

export default function SupportChat({ isOpen, onClose }: SupportChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [escalated, setEscalated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Load history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("supportChatHistory")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      setMessages([{ sender: "bot", text: "Hello! 👋 How can I help you today?" }])
    }
  }, [])

  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem("supportChatHistory", JSON.stringify(messages))
  }, [messages])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = { sender: "user", text: input }
    setMessages((prev) => [...prev, newMessage])

    // Bot response or escalate
    setTimeout(() => {
      if (!escalated) {
        if (input.toLowerCase().includes("agent")) {
          setEscalated(true)
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "Connecting you to a support agent... 👨‍💻" },
            { sender: "agent", text: "Hello, I’m here to assist you further. 😊" },
          ])
        } else {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "I see. Could you please provide more details?" },
          ])
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "agent", text: "I’m still with you, let me check that." },
        ])
      }
    }, 1000)

    setInput("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 w-80 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="flex h-96 flex-col rounded-lg bg-white dark:bg-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-3 dark:border-slate-700">
              <h4 className="font-semibold text-slate-800 dark:text-white">
                Support Chat
              </h4>
              <button onClick={onClose}>
                <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : msg.sender === "agent"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center border-t p-2 dark:border-slate-700">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-md border border-slate-300 p-2 text-sm focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="ml-2 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
