import { motion } from 'framer-motion'
import { Droplets, Mail, ArrowUpRight, Globe, Share2, Code2 } from 'lucide-react'

// Brand Icons
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

interface FooterProps {
  darkMode: boolean
}

const quickLinks = [
  { label: 'The Problem', href: '#problem' },
  { label: 'Our Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Live Simulation', href: '#simulation' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Technology', href: '#technology' },
  { label: 'Impact', href: '#impact' },
  { label: 'Facility Map', href: '#facility-map' },
]

const socialLinks = [
  { icon: <GithubIcon size={18} />, href: 'https://github.com/shivteg/aquaclean-ai', label: 'GitHub' },
  { icon: <TwitterIcon size={18} />, href: '#', label: 'Twitter' },
  { icon: <LinkedinIcon size={18} />, href: '#', label: 'LinkedIn' },
  { icon: <Mail size={18} />, href: '#contact', label: 'Email' },
]

const techStack = [
  'React + TypeScript',
  'Framer Motion',
  'Tailwind CSS',
  'Supabase',
  'TensorFlow Lite',
]

export default function Footer({ darkMode: _ }: FooterProps) {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1628] to-[#060d1a] border-t border-white/5 overflow-hidden">
      {/* Glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#06b6d4]/50 to-transparent" />

      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => handleNav('#home')}
                className="flex items-center gap-3 mb-4 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center shadow-[0_4px_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_6px_20px_rgba(6,182,212,0.6)] transition-shadow">
                  <Droplets size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    AquaClean <span className="gradient-text">AI</span>
                  </div>
                </div>
              </button>

              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                Smarter Waste Removal. Cleaner Water. Better Tomorrow.
                Revolutionizing water treatment through intelligent automation and AI-driven monitoring.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={href.startsWith('#') ? (e) => { e.preventDefault(); handleNav(href) } : undefined}
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center
                               text-white/50 hover:text-[#06b6d4]
                               bg-white/5 hover:bg-[#06b6d4]/10
                               border border-white/10 hover:border-[#06b6d4]/30
                               transition-all duration-300"
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map(({ label, href }) => (
                  <li key={href}>
                    <button
                      onClick={() => handleNav(href)}
                      className="group flex items-center gap-1.5 text-sm text-white/50 hover:text-[#06b6d4] transition-colors duration-200 cursor-pointer"
                    >
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 transition-transform"
                      />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
                Built With
              </h4>
              <ul className="space-y-2.5">
                {techStack.map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                    <span className="text-sm text-white/50">{tech}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/60 font-medium">System Status</span>
                </div>
                <div className="text-xs text-green-400 font-semibold">All Systems Operational</div>
                <div className="text-xs text-white/30 mt-0.5">99.9% uptime this month</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/30 text-sm text-center sm:text-left"
            >
              © 2024 AquaClean AI. All rights reserved. Built for a cleaner tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span className="text-white/20 text-xs">Privacy Policy</span>
              <span className="text-white/10">|</span>
              <span className="text-white/20 text-xs">Terms of Service</span>
              <span className="text-white/10">|</span>
              <span className="text-white/20 text-xs">Contact</span>
            </motion.div>
          </div>

          {/* Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-center"
          >
            <span className="text-white/15 text-xs">
              Designed with ❤️ for environmental innovation
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
