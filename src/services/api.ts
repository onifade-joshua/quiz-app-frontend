import axios from "axios"
import type { Question, CreateQuestionData, User } from "../types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
})

// JWT interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

// ---------- AUTH ----------
export const authAPI = {
  login: async (data: { email: string; password: string }) => {
    const res = await api.post<{ user: User; token: string }>("/auth/login", data)
    localStorage.setItem("token", res.data.token)
    return res.data
  },
  register: async (data: { name: string; email: string; password: string }) => {
    const res = await api.post<{ user: User; token: string }>("/auth/register", data)
    localStorage.setItem("token", res.data.token)
    return res.data
  },
  logout: async () => {
    localStorage.removeItem("token")
    try {
      await api.post("/auth/logout")
    } catch {}
  },
  getMe: async () => {
    const res = await api.get<{ user: User }>("/auth/me")
    return res.data.user
  },
  forgotPassword: async (data: { email: string }) => {
    const res = await api.post<{ message: string }>("/auth/forgot-password", data)
    return res.data
  },
  resetPassword: async (data: { token: string; password: string }) => {
    const res = await api.post<{ message: string }>("/auth/reset-password", data)
    return res.data
  },
}

// ---------- QUESTIONS ----------
export const questionsAPI = {
  getAll: async () => {
    const res = await api.get<Question[]>("/questions")
    return res.data
  },
  create: async (data: CreateQuestionData) => {
    const res = await api.post<Question>("/questions", data)
    return res.data
  },
  update: async (id: string, data: CreateQuestionData) => {
    const res = await api.put<Question>(`/questions/${id}`, data)
    return res.data
  },
  delete: async (id: string) => {
    const res = await api.delete(`/questions/${id}`)
    return res.data
  },
}
