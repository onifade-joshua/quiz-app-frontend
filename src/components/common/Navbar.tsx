import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { Button } from './Button'
import {
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'

export const Navbar: React.FC = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize dark mode from localStorage or system preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return JSON.parse(saved)
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Apply dark mode class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const isActive = (path: string) => location.pathname === path

  const NavLinks = () => (
    <>
      <Link
        to="/dashboard"
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive('/dashboard')
            ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/50'
            : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <HomeIcon className="h-4 w-4 mr-1" />
        Dashboard
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </Link>

      <Link
        to="/questions"
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive('/questions')
            ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/50'
            : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <QuestionMarkCircleIcon className="h-4 w-4 mr-1" />
        Questions
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </Link>

      <Link
        to="/quiz"
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive('/quiz')
            ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/50'
            : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />
        Take Quiz
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </Link>

      <Link
        to="/results"
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive('/results')
            ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/50'
            : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />
        Results
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </Link>

      <Link
        to="/profile"
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive('/profile')
            ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/50'
            : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <UserCircleIcon className="h-4 w-4 mr-1" />
        Profile
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </Link>
    </>
  )

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
              Quiz App
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex ml-8 space-x-4">
              <NavLinks />
            </div>
          </div>

          {/* Right side desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark mode toggle button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <Link
              to="/auth"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 focus:outline-none"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <NavLinks />
          <Link
            to="/auth"
            className="block text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}