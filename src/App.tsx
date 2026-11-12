import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Problem from './components/Problem';
import Solution from './components/Solution';
import AquaCleanRobot from './components/AquaCleanRobot';
import Simulation from './components/Simulation';
import AquaFert from './components/AquaFert';
import AquaPure from './components/AquaPure';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import ScientificPrinciples from './components/ScientificPrinciples';
import Impact from './components/Impact';
import Comparison from './components/Comparison';
import FutureScope from './components/FutureScope';
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
        {/* Section 1: Home Landing Hero */}
        <Hero darkMode={darkMode} />

        {/* Section 2: About AquaSense & Before/After Comparison */}
        <About darkMode={darkMode} />

        {/* Section 3: The Problem */}
        <Problem />

        {/* Section 4: Our Solution & Interactive Waste Separation */}
        <Solution />

        {/* Section 5: Unit A — AquaClean Floating Smart Robot */}
        <AquaCleanRobot />

        {/* Section 6: Interactive Live Pond Robot Simulation */}
        <Simulation />

        {/* Section 7: Unit B — AquaFert Algae-to-Fertiliser Unit */}
        <AquaFert />

        {/* Section 8: Unit C — AquaPure 7-Stage Water Treatment */}
        <AquaPure />

        {/* Section 9: Complete Interactive Working Flowchart */}
        <HowItWorks />

        {/* Section 10: Interactive Monitoring Dashboard */}
        <Dashboard />

        {/* Section 11: Dedicated Scientific Principles */}
        <ScientificPrinciples />

        {/* Section 12: Environmental Impact & Circular Economy */}
        <Impact darkMode={darkMode} />

        {/* Section 13: Traditional vs AquaSense Paradigm Comparison */}
        <Comparison darkMode={darkMode} />

        {/* Section 14: Future Scope & Long-Term Roadmap */}
        <FutureScope darkMode={darkMode} />

        {/* Section 15: Contact & LPU Project Team */}
        <Contact darkMode={darkMode} onShowToast={showToast} />

        {/* Section 16: Academic Rigor & Scientific Accuracy Notice */}
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
