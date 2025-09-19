// Validate email format with regex
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // basic RFC5322-compliant regex
  return re.test(email.toLowerCase())
}

// Validate password strength (at least 6 chars)
export const validatePassword = (password: string): boolean => {
  return password.length >= 6
  // return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)
}

// Format seconds into mm:ss
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Calculate percentage of correct answers
export const calculatePercentage = (correct: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}
