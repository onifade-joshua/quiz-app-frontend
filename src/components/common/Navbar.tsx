import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { authAPI } from "../../services/api";
import { Button } from "./Button";
import toast from "react-hot-toast";
import {
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ConfirmationModal } from "./ConfirmationModal";

export const Navbar: React.FC = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      {user && (
        <>
          <Link
            to="/dashboard"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/dashboard")
                ? "text-primary-600 bg-primary-50 dark:bg-slate-700 dark:text-yellow-400"
                : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-yellow-400"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <HomeIcon className="h-4 w-4 mr-1" />
            Dashboard
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>

          <Link
            to="/study-community"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/study-community")
                ? "text-primary-600 bg-primary-50 dark:bg-slate-700 dark:text-yellow-400"
                : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-yellow-400"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />
            Study Community
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>

          <Link
            to="/cbt-practice"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/cbt-practice")
                ? "text-primary-600 bg-primary-50 dark:bg-slate-700 dark:text-yellow-400"
                : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-yellow-400"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <QuestionMarkCircleIcon className="h-4 w-4 mr-1" />
            CBT Practice
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>

          <Link
            to="/profile"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/profile")
                ? "text-primary-600 bg-primary-50 dark:bg-slate-700 dark:text-yellow-400"
                : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-yellow-400"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <UserCircleIcon className="h-4 w-4 mr-1" />
            Profile
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xl font-bold text-yellow-500 dark:text-yellow-400"
              >
                ClassWise
              </Link>

              {/* Desktop links */}
              <div className="hidden md:flex ml-8 space-x-4">
                <NavLinks />
              </div>
            </div>

            {/* Right side desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user.name}
                  </span>
                  <Button
                    onClick={() => setShowConfirm(true)}
                    variant="secondary"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-yellow-400"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-yellow-400 focus:outline-none"
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
          <div className="md:hidden px-4 pb-3 space-y-2 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <NavLinks />
            {user ? (
              <div className="space-y-2">
                <span className="block text-sm text-gray-600 dark:text-gray-300">
                  Welcome, {user.name}
                </span>
                <Button
                  onClick={() => setShowConfirm(true)}
                  variant="secondary"
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="block text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-yellow-400"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Custom confirmation modal */}
      <ConfirmationModal
        open={showConfirm}
        title="Logout Confirmation"
        message="Are you sure you want to log out?"
        onConfirm={() => {
          setShowConfirm(false);
          handleLogout();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};
