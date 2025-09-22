# Quiz Application - Frontend

A modern, responsive quiz application built with React 19, TypeScript, and Tailwind CSS. This application provides a complete user interface for user authentication, quiz management, and interactive quiz taking.

## 🚀 Live Demo
- **Frontend Application**: https://quiz-app-assessment.netlify.app
- **Status**: Fully functional frontend, backend integration in progress

## 📱 Demo Credentials
Once backend is connected:
- **Email**: demo@example.com
- **Password**: password123

## ✨ Features

### Core Functionality
✅ **User Authentication**
- Secure login and registration forms
- Real-time form validation
- Protected route navigation
- Professional error handling

✅ **Quiz Management** 
- Create, edit, and delete quiz questions
- Four multiple-choice options per question
- Correct answer selection
- Responsive question cards layout

✅ **Interactive Quiz Taking**
- One question at a time interface
- Progress tracking and navigation
- Built-in timer functionality
- Real-time answer selection
- Quiz results display with scoring

✅ **Professional UI/UX**
- Fully responsive design (mobile-first)
- Loading states and spinners
- Toast notifications for user feedback
- Clean, modern interface with Tailwind CSS
- Accessibility considerations

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.2+** - Latest React with hooks and modern patterns
- **TypeScript 5+** - Full type safety throughout application
- **Vite 5+** - Fast build tool and development server

### State Management & Routing
- **Zustand 4.4+** - Lightweight, modern state management
- **React Router v6+** - Client-side routing with protected routes
- **Persistent Storage** - User authentication state persistence

### Styling & UI
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Unstyled, accessible UI components
- **React Hot Toast** - Elegant toast notifications

### HTTP & API
- **Axios** - HTTP client with interceptors
- **Error Handling** - Centralized API error management
- **Loading States** - Comprehensive loading feedback

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/   Button.tsx,  Dashboard.tsx, Input.tsx, LoadingSpinner.tsx, Navbar.tsx, Profile.tsx, Result.tsx     
│   ├── auth/  LoginForm.tsx, RegisterForm.tsx         # Authentication components
│   ├── questions/  QuestioCard.tsx, QuestionForm.tsx, QuestionList.tsx    # Question management components
│   └── quiz/  QuizQuestion.tsx, QuizResult.tsx, Timer.tsx         # Quiz taking components
├── ProtectedRoute.tsx 
├── pages/              # Route-level components
│   ├── AuthPage.tsx    # Login/Register page
│   ├── QuestionsPage.tsx # Questions management
│   └── QuizPage.tsx    # Quiz interface
├── services/           # API service layer
│   └── api.ts          # Axios configuration and API calls
├── store/              # State management
│   └── useStore.ts     # Zustand store configuration
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── utils/              # Helper functions
│   └── helpers.ts      # Utility functions
└── App.tsx
├── main.tsx 
             
├── .env 
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0+ 
- npm or yarn package manager

### Installation & Setup
```bash
# Clone the repository
git clone [your-repo-url]
cd quiz-app-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables
Create `.env.local` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎯 Core Components

### Authentication System
- **AuthPage**: Combined login/register interface
- **ProtectedRoute**: Route protection with redirect logic
- **Persistent Auth**: Automatic login state restoration

### Question Management
- **QuestionsList**: Display all questions with actions
- **QuestionForm**: Create/edit question interface
- **QuestionCard**: Individual question display

### Quiz Interface
- **QuizQuestion**: Single question display with options
- **Timer**: Real-time quiz timer component
- **QuizResults**: Score display and results summary

## 🔧 Technical Highlights

### Modern React Patterns
- Functional components with hooks
- Custom hooks for logic encapsulation
- Context-free state management with Zustand
- Proper error boundaries and loading states

### TypeScript Integration
- Strict type checking enabled
- Comprehensive interface definitions
- Type-safe API service layer
- Proper component prop typing

### Performance Optimizations
- Code splitting with React.lazy
- Efficient re-rendering with proper dependencies
- Optimized bundle size with Vite
- Image optimization and caching

### Security Considerations
- XSS protection through proper data handling
- Secure cookie handling for authentication
- Input validation on frontend
- Protected route implementation

## 📱 Responsive Design

The application is built mobile-first with:
- **Breakpoints**: Tailwind's responsive system
- **Touch-friendly**: Optimized for mobile interaction
- **Progressive Enhancement**: Works across all device sizes
- **Accessibility**: ARIA labels and keyboard navigation

## 🔌 API Integration

### Service Layer Architecture
```typescript
// Clean API abstraction
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout')
}
```

### Error Handling
- Centralized error interceptors
- User-friendly error messages
- Automatic token refresh handling
- Network error recovery

## 🚀 Deployment

### Build Configuration
- **Vite Config**: Optimized for production
- **Environment Variables**: Proper environment handling
- **Build Output**: Optimized static files

### Deployment Platforms
- ✅ **Vercel** (Recommended)
- ✅ **Netlify** 
- ✅ **GitHub Pages**

## 📊 Current Status

### ✅ Completed Features
- Complete UI/UX implementation
- Full TypeScript integration
- State management setup
- Responsive design
- Component architecture
- API service layer
- Error handling system

### 🔄 In Progress
- Backend API integration
- Live deployment
- Final testing and optimization

## 👨‍💻 Developer Information

**Joshua Abiodun Onifade**
- **Email**: onifadejoshua15@gmail.com
- **Phone**: 07010600659
- **GitHub**: 

## 🔜 Next Steps

1. **Backend Integration**: Connect to Express.js API
2. **Database Connection**: PostgreSQL with Prisma ORM
3. **Full Deployment**: Complete application deployment
4. **Testing**: Comprehensive application testing

## 🤝 Contributing

This is a technical assessment project. For any questions or clarifications, please contact the developer directly.

## 📄 License

This project is created as part of a technical assessment for ReadWrite DS.

---

**Note**: This frontend application demonstrates modern React development practices, TypeScript proficiency, and professional UI/UX design. The architecture is designed for easy integration with the backend API once deployment is complete.
