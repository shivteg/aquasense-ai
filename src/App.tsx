import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Simulation from './components/Simulation';
import Dashboard from './components/Dashboard';
import Technology from './components/Technology';
import Comparison from './components/Comparison';
import Impact from './components/Impact';
import FutureScope from './components/FutureScope';
import Team from './components/Team';
import Contact from './components/Contact';
import ScientificAccuracy from './components/ScientificAccuracy';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Toast, { type ToastItem } from './components/Toast';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = useCallback(
    (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      const newToast: ToastItem = { id, title, message, type };
      setToasts((prev) => [...prev.slice(-3), newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleDark = () => {
    setDarkMode((prev) => {
      const next = !prev;
      showToast(
        next ? 'Dark Mode Activated' : 'Light Mode Activated',
        `Switched visual appearance to ${next ? 'Industrial Night' : 'Clean Daylight'}.`,
        'info'
      );
      return next;
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-cyan-500 selection:text-white ${
        darkMode ? 'bg-[#0a1628] text-white' : 'bg-[#f8faff] text-[#0a1628]'
      }`}
    >
      {/* Sticky Navigation Bar */}
      <Navbar darkMode={darkMode} onToggleDark={handleToggleDark} />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Page 1: Home Landing Hero */}
        <Hero darkMode={darkMode} />

        {/* Page 2: The Problem */}
        <Problem />

        {/* Page 3: Our Solution */}
        <Solution />

        {/* Page 4: How It Works Interactive Process Flow */}
        <HowItWorks />

        {/* Page 5: Interactive Working Simulation (Canvas) */}
        <Simulation />

        {/* Page 6: Interactive Monitoring Dashboard */}
        <Dashboard />

        {/* Page 7: Technology Used */}
        <Technology />

        {/* Page 8: Manual vs Automated System Comparison */}
        <Comparison darkMode={darkMode} />

        {/* Page 9: Benefits and Environmental Impact */}
        <Impact darkMode={darkMode} />

        {/* Page 10: Future Scope */}
        <FutureScope darkMode={darkMode} />

        {/* Page 11: Project Team */}
        <Team darkMode={darkMode} />

        {/* Page 12: Contact */}
        <Contact darkMode={darkMode} onShowToast={showToast} />

        {/* Section 7 Requirement: Scientific Accuracy & Rigor Notice */}
        <ScientificAccuracy darkMode={darkMode} />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
