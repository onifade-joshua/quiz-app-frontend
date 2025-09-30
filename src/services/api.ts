import axios from "axios";
// import type { Question, CreateQuestionData, User, QuizAnswer, QuizResult } from "../types";
import type { Question, CreateQuestionData, User } from "../types";
// Backend API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

//  JWT token 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ---------- AUTH API ----------
export const authAPI = {
  login: async (data: { email: string; password: string }) => {
    const res = await api.post<{ user: User; token: string }>("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  },
  register: async (data: { name: string; email: string; password: string }) => {
    const res = await api.post<{ user: User; token: string }>("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  },
  logout: async () => {
    localStorage.removeItem("token");
    try { await api.post("/auth/logout"); } catch {}
  },
  getMe: async () => {
    const res = await api.get<{ user: User }>("/auth/me");
    return res.data.user;
  },
  
  forgotPassword: async (data: { email: string }) => {
    const res = await api.post<{ message: string }>("/auth/forgot-password", data);
    return res.data;
  },
};

// ---------- QUESTIONS API ----------
export const questionsAPI = {
  getAll: async () => {
    const res = await api.get<Question[]>("/questions");
    return res.data;
  },
  
  create: async (data: CreateQuestionData) => {
    const payload = {
      question: data.question,
      option1: data.option1,
      option2: data.option2,
      option3: data.option3,
      option4: data.option4,
      correctAnswer: data.correctAnswer
    };
    const res = await api.post<Question>("/questions", payload);
    return res.data;
  },

  update: async (id: string, data: CreateQuestionData) => {
    const res = await api.put<Question>(`/questions/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/questions/${id}`);
    return res.data;
  },
};


// ---------- QUIZ API ----------
export const quizAPI = {
  start: async (): Promise<Question[]> => {
    const res = await api.get<Question[]>("/quiz/start");
    return res.data;
  },
  submit: async (data: {
    userId: string;
    answers: any[];
    timeElapsed: number;
    totalQuestions: number;
  }): Promise<{
    result: {
      score: number;
      total: number;
      percentage: number;
      timeElapsed: number;
    };
  }> => {
    const res = await api.post<
      { result: { score: number; total: number; percentage: number; timeElapsed: number } }
    >("/quiz/submit", data);
    return res.data;
  },
};

