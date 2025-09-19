import type { User, AuthFormData } from '../types'
import { DEMO_USER } from '../data/mockData'
import { delay, isValidDemoCredentials } from '../utils/mockUtils'

export class MockAuthAPI {
  /**
   * Mock user registration
   */
  async register(data: AuthFormData): Promise<{ message: string; user: User }> {
    await delay(1000) // Simulate API delay
    
    if (isValidDemoCredentials(data.email, data.password)) {
      return {
        message: 'Registration successful',
        user: DEMO_USER
      }
    }
    
    // new user for other credentials
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name || 'New User',
      createdAt: new Date().toISOString()
    }
    
    return {
      message: 'Registration successful',
      user: newUser
    }
  }

  /**
   * Mock user login
   */
  async login(data: AuthFormData): Promise<{ message: string; user: User }> {
    await delay(1000) // Simulate API delay
    
    if (isValidDemoCredentials(data.email, data.password)) {
      return {
        message: 'Login successful',
        user: DEMO_USER
      }
    }
    
    throw new Error('Invalid credentials')
  }

  /**
   * Mock user logout
   */
  async logout(): Promise<{ message: string }> {
    await delay(500)
    return { message: 'Logout successful' }
  }

  /**
   * Mock get current user
   */
  async getMe(): Promise<{ user: User }> {
    await delay(500)
    return { user: DEMO_USER }
  }
}

export const mockAuthAPI = new MockAuthAPI()
