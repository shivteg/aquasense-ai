import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, Menu, X, Sun, Moon } from 'lucide-react'
import clsx from 'clsx'

interface NavbarProps {
  darkMode: boolean
  onToggleDark: () => void
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'The Problem', href: '#problem' },
  { label: 'Our Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Simulation', href: '#simulation' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Technology', href: '#technology' },
  { label: 'Impact', href: '#impact' },
  { label: 'Facility Map', href: '#facility-map' },
]

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navBg = scrolled
    ? darkMode
      ? 'bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(6,182,212,0.08)]'
      : 'bg-white/90 backdrop-blur-xl border-b border-[#06b6d4]/20 shadow-[0_4px_30px_rgba(6,182,212,0.08)]'
    : 'bg-transparent'

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
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-2.5 group cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center shadow-[0_4px_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_6px_20px_rgba(6,182,212,0.6)] transition-shadow duration-300">
                <Droplets size={20} className="text-white" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={clsx(
                    'font-poppins font-700 text-lg leading-tight tracking-tight',
                    darkMode || !scrolled ? 'text-white' : 'text-[#0a1628]'
                  )}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                >
                  AquaClean
                </span>
                <span className="text-[#06b6d4] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  AI
                </span>
              </div>
            </motion.button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={clsx(
                    'relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
                    activeSection === href
                      ? 'text-[#06b6d4]'
                      : darkMode || !scrolled
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-[#0a1628]/70 hover:text-[#0a1628] hover:bg-[#0a1628]/5'
                  )}
                >
                  {label}
                  {activeSection === href && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/30"
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

              {/* CTA button (desktop) */}
              <motion.button
                onClick={() => handleNavClick('#simulation')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white
                           bg-gradient-to-r from-[#06b6d4] to-[#0891b2]
                           shadow-[0_4px_15px_rgba(6,182,212,0.3)]
                           hover:shadow-[0_6px_25px_rgba(6,182,212,0.5)]
                           transition-shadow duration-300 cursor-pointer"
              >
                Live Demo
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileOpen((o) => !o)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={clsx(
                  'lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 md:top-20 left-0 right-0 z-40 lg:hidden
                       bg-[#0a1628]/95 backdrop-blur-xl border-b border-white/10
                       shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            style={{ transformOrigin: 'top' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(href)}
                  className={clsx(
                    'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
                    activeSection === href
                      ? 'text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  {label}
                </motion.button>
              ))}
              <div className="border-t border-white/10 mt-2 pt-3">
                <button
                  onClick={() => handleNavClick('#simulation')}
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white text-center
                             bg-gradient-to-r from-[#06b6d4] to-[#0891b2] cursor-pointer"
                >
                  Experience Live Simulation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
