/**
 * Helper function to simulate API delay for more realistic UX
 */
export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * Validates demo credentials
 */
export const isValidDemoCredentials = (email: string, password: string): boolean => {
  return email === 'demo@example.com' && password === 'password123'
}

/**
 * Generates a unique ID for new items
 */
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

/**
 * Shuffles an array for quiz randomization
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5)
}
