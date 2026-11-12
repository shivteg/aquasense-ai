import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sprout, Waves } from 'lucide-react';
import clsx from 'clsx';

interface NavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'The Problem', href: '#problem' },
  { label: 'Our Solution', href: '#solution' },
  { label: 'AquaClean Robot', href: '#aquaclean' },
  { label: 'AquaFert', href: '#aquafert' },
  { label: 'AquaPure', href: '#aquapure' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Principles', href: '#scientific-principles' },
  { label: 'Impact', href: '#impact' },
  { label: 'Future Scope', href: '#future-scope' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navBg = scrolled
    ? darkMode
      ? 'bg-[#0a1628]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(6,182,212,0.1)]'
      : 'bg-white/95 backdrop-blur-xl border-b border-[#06b6d4]/20 shadow-[0_4px_30px_rgba(6,182,212,0.1)]'
    : 'bg-transparent';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          navBg
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo: AQUASENSE */}
            <motion.button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-3 group cursor-pointer text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 flex items-center justify-center shadow-[0_4px_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_6px_25px_rgba(6,182,212,0.6)] transition-all duration-300">
                <Waves size={22} className="text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center shadow-sm">
                  <Sprout size={10} className="text-slate-950" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <div className="flex items-center gap-1.5">
                  <span
                    className={clsx(
                      'font-poppins font-extrabold text-xl leading-tight tracking-tight',
                      darkMode || !scrolled ? 'text-white' : 'text-[#0a1628]'
                    )}
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}
                  >
                    AQUA<span className="text-cyan-400">SENSE</span>
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase mt-0.5">
                  Clean Water • Green Agri
                </span>
              </div>
            </motion.button>

            {/* Desktop Nav Links - Scrollable / Compact */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.slice(0, 10).map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={clsx(
                    'relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer',
                    activeSection === href
                      ? 'text-cyan-400 font-semibold'
                      : darkMode || !scrolled
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-[#0a1628]/70 hover:text-[#0a1628] hover:bg-[#0a1628]/5'
                  )}
                >
                  {label}
                  {activeSection === href && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-400/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <motion.button
                onClick={onToggleDark}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={clsx(
                  'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
                  darkMode || !scrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-[#0a1628]/70 hover:text-[#0a1628] hover:bg-[#0a1628]/5'
                )}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* Simulation Demo Button */}
              <motion.button
                onClick={() => handleNavClick('#simulation')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white
                           bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-600
                           shadow-[0_4px_15px_rgba(6,182,212,0.3)]
                           hover:shadow-[0_6px_25px_rgba(6,182,212,0.5)]
                           transition-all duration-300 cursor-pointer"
              >
                <span>Robot Simulation</span>
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileOpen((o) => !o)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={clsx(
                  'xl:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
                  darkMode || !scrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-[#0a1628]/70 hover:text-[#0a1628] hover:bg-[#0a1628]/5'
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 md:top-20 left-0 right-0 z-40 xl:hidden
                       bg-[#0a1628]/98 backdrop-blur-2xl border-b border-white/10
                       shadow-[0_20px_60px_rgba(0,0,0,0.7)] max-h-[85vh] overflow-y-auto"
            style={{ transformOrigin: 'top' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              <div className="px-4 py-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest border-b border-white/10 mb-1">
                AquaSense Navigation Directory
              </div>
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleNavClick(href)}
                  className={clsx(
                    'w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-between',
                    activeSection === href
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span>{label}</span>
                  {activeSection === href && <span className="text-xs text-cyan-400">●</span>}
                </motion.button>
              ))}
              <div className="border-t border-white/10 mt-3 pt-3">
                <button
                  onClick={() => handleNavClick('#simulation')}
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white text-center
                             bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-600 cursor-pointer shadow-lg"
                >
                  Launch Robot Simulation Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
