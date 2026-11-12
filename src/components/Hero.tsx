import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Droplets, Zap, Shield } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

interface HeroProps {
  darkMode: boolean
}

// Animated water particle
function WaterParticle({ x, y, delay, size = 4 }: { x: number; y: number; delay: number; size?: number }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size / 2}
      fill="#22d3ee"
      fillOpacity={0.6}
      initial={{ opacity: 0, cy: y }}
      animate={{
        opacity: [0, 0.8, 0],
        cy: [y, y - 25, y - 50],
        cx: [x, x + (Math.random() - 0.5) * 20, x + (Math.random() - 0.5) * 30],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// Floating debris particle
function DebrisParticle({ delay }: { delay: number }) {
  const shapes = ['●', '■', '▲', '◆']
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  return (
    <motion.span
      className="absolute text-xs opacity-60"
      style={{ color: '#6b7280' }}
      initial={{ x: 80, y: 20 + Math.random() * 60, opacity: 0 }}
      animate={{
        x: [80, 160, 220],
        y: [20 + Math.random() * 60, 30 + Math.random() * 40, 25 + Math.random() * 50],
        opacity: [0, 0.7, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {shape}
    </motion.span>
  )
}

// SVG water flow line
function WaterFlowLine({ y, delay }: { y: number; delay: number }) {
  return (
    <motion.line
      x1="0"
      y1={y}
      x2="600"
      y2={y}
      stroke="#06b6d4"
      strokeWidth="2"
      strokeDasharray="12 8"
      strokeLinecap="round"
      initial={{ strokeDashoffset: 200 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export default function Hero({ darkMode }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const handleExplore = () => {
    document.querySelector('#problem')?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleSimulation = () => {
    document.querySelector('#simulation')?.scrollIntoView({ behavior: 'smooth' })
  }

  const featurePills = [
    { icon: <Droplets size={14} />, label: 'Smart Screening' },
    { icon: <Zap size={14} />, label: 'AI Detection' },
    { icon: <Shield size={14} />, label: 'Real-time Monitoring' },
  ]

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d2244] to-[#0a1628]" />

      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.12) 0%, transparent 70%)',
            'radial-gradient(ellipse 90% 70% at 55% 45%, rgba(34,211,238,0.15) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.12) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Star particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: 2 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                     bg-[#06b6d4]/10 border border-[#06b6d4]/30
                     text-[#22d3ee] text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06b6d4]" />
          </span>
          Innovative Water Treatment Technology
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {featurePills.map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         bg-white/5 border border-white/10 text-white/70 text-xs font-medium"
            >
              <span className="text-[#06b6d4]">{pill.icon}</span>
              {pill.label}
            </div>
          ))}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Reimagining the{' '}
          <span className="relative">
            <span className="gradient-text">Future of Water</span>
          </span>
          <br />
          Treatment
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          An intelligent approach to automated waste removal through mechanical screening,
          smart monitoring and AI-assisted detection.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={handleExplore}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl text-base font-semibold text-white cursor-pointer
                       bg-gradient-to-r from-[#06b6d4] to-[#0891b2]
                       shadow-[0_8px_30px_rgba(6,182,212,0.4)]
                       hover:shadow-[0_12px_40px_rgba(6,182,212,0.6)]
                       transition-shadow duration-300 w-full sm:w-auto"
          >
            Explore Our Innovation
          </motion.button>
          <motion.button
            onClick={handleSimulation}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl text-base font-semibold text-[#06b6d4] cursor-pointer
                       bg-transparent border-2 border-[#06b6d4]/50
                       hover:border-[#06b6d4] hover:bg-[#06b6d4]/10
                       transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
          >
            Experience Live Simulation
          </motion.button>
        </motion.div>

        {/* SVG Water Treatment Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden
                     bg-white/5 border border-white/10 backdrop-blur-md
                     shadow-[0_20px_60px_rgba(6,182,212,0.15)] p-6"
        >
          <div className="text-xs text-white/40 text-left mb-3 font-mono uppercase tracking-widest">
            Water Treatment Process — Live Diagram
          </div>

          <svg
            viewBox="0 0 700 160"
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d2244" stopOpacity="1" />
                <stop offset="100%" stopColor="#0a1628" stopOpacity="1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="700" height="160" fill="url(#grid)" />

            {/* === STAGE 1: Water Inlet === */}
            {/* Inlet pipe */}
            <rect x="10" y="68" width="80" height="24" rx="4" fill="url(#waterGrad)" />
            {/* Animated water flow in pipe */}
            <motion.rect
              x="10" y="68" width="20" height="24" rx="2"
              fill="rgba(34,211,238,0.6)"
              initial={{ x: 10 }}
              animate={{ x: 72 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            {/* Arrow */}
            <polygon points="90,65 100,80 90,95" fill="#06b6d4" />
            {/* Label */}
            <text x="45" y="110" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="Inter, sans-serif">Water Inlet</text>

            {/* === STAGE 2: Floating Waste Zone === */}
            <rect x="100" y="40" width="110" height="80" rx="6" fill="url(#boxGrad)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
            <text x="155" y="58" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="Inter, sans-serif">Waste Zone</text>

            {/* Animated floating waste particles */}
            {[0, 0.4, 0.8, 1.2, 1.6].map((d, i) => (
              <motion.circle
                key={i}
                cx={115 + (i % 3) * 30}
                cy={75 + (i % 2) * 15}
                r={4 + (i % 2)}
                fill={i % 2 === 0 ? '#6b7280' : '#78716c'}
                fillOpacity={0.7}
                animate={{
                  cy: [75 + (i % 2) * 15, 65 + (i % 2) * 15, 75 + (i % 2) * 15],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 2 + d, delay: d, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
            {/* Arrow */}
            <polygon points="210,75 220,80 210,85" fill="#06b6d4" />

            {/* === STAGE 3: Bar Screen === */}
            <rect x="220" y="40" width="100" height="80" rx="6" fill="url(#boxGrad)" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
            <text x="270" y="58" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600">Bar Screen</text>
            {/* Vertical bars of the screen */}
            {[232, 244, 256, 268, 280, 292, 304].map((bx) => (
              <rect key={bx} x={bx} y={62} width="3" height="45" rx="1.5" fill="#06b6d4" fillOpacity="0.6" />
            ))}
            {/* Water flow lines through screen */}
            {[70, 78, 86, 94].map((by, i) => (
              <WaterFlowLine key={by} y={by} delay={i * 0.3} />
            ))}
            {/* Arrow */}
            <polygon points="320,75 330,80 320,85" fill="#06b6d4" />

            {/* === STAGE 4: Rake Mechanism === */}
            <rect x="330" y="40" width="110" height="80" rx="6" fill="url(#boxGrad)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" />
            <text x="385" y="58" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600">Rake Mechanism</text>
            {/* Rake arm - animated moving up */}
            <motion.g
              animate={{ y: [-20, 0, -20] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect x="375" y="65" width="4" height="35" rx="2" fill="#f59e0b" />
              {/* Rake teeth */}
              {[0, 8, 16, 24].map((tx) => (
                <rect key={tx} x={358 + tx} y="98" width="3" height="10" rx="1" fill="#f59e0b" />
              ))}
            </motion.g>
            {/* Debris being lifted */}
            <motion.circle
              cx="380" cy="85"
              r="4"
              fill="#6b7280"
              fillOpacity={0.8}
              animate={{ cy: [85, 65, 50], opacity: [0.8, 0.8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Arrow */}
            <polygon points="440,75 450,80 440,85" fill="#06b6d4" />

            {/* === STAGE 5: Collection Bin === */}
            <rect x="450" y="40" width="100" height="80" rx="6" fill="url(#boxGrad)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" />
            <text x="500" y="58" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600">Collection Bin</text>
            {/* Bin shape */}
            <path d="M 465 65 L 460 115 L 540 115 L 535 65 Z" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
            {/* Collected debris */}
            <motion.g
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <circle cx="480" cy="105" r="4" fill="#6b7280" fillOpacity="0.7" />
              <circle cx="493" cy="108" r="3" fill="#78716c" fillOpacity="0.7" />
              <circle cx="505" cy="104" r="5" fill="#6b7280" fillOpacity="0.6" />
              <circle cx="519" cy="107" r="3" fill="#9ca3af" fillOpacity="0.6" />
            </motion.g>
            {/* Fill level */}
            <motion.rect
              x="461" y="90"
              width="78"
              height="24"
              rx="2"
              fill="rgba(107,114,128,0.15)"
              animate={{ height: [15, 25, 15] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* === STAGE 6: Clean Water Output === */}
            <rect x="560" y="68" width="80" height="24" rx="4" fill="#22c55e" fillOpacity="0.3" />
            <motion.rect
              x="560" y="68"
              width="20" height="24"
              rx="2"
              fill="rgba(34,197,94,0.5)"
              animate={{ x: [560, 622] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            <text x="600" y="110" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="Inter, sans-serif">Clean Output</text>
            {/* Check mark */}
            <circle cx="600" cy="80" r="8" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1" />
            <path d="M 595 80 L 599 84 L 606 76" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

            {/* Stage labels at top */}
            {[
              { x: 50, label: '① Inlet' },
              { x: 155, label: '② Screening' },
              { x: 270, label: '③ Bar Filter' },
              { x: 385, label: '④ Rake' },
              { x: 500, label: '⑤ Collection' },
              { x: 600, label: '⑥ Output' },
            ].map(({ x, label }) => (
              <text key={label} x={x} y="18" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Inter, sans-serif">
                {label}
              </text>
            ))}

            {/* Water particles flowing through */}
            {mounted && [0, 0.5, 1, 1.5, 2].map((d) => (
              <WaterParticle key={d} x={200 + d * 20} y={80} delay={d} size={5} />
            ))}
          </svg>

          {/* AI Status bar */}
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/40 font-mono">AI System Active</span>
            </div>
            <div className="flex items-center gap-4">
              {[
                { label: 'Efficiency', value: '94%', color: '#22c55e' },
                { label: 'Waste Captured', value: '99.2%', color: '#06b6d4' },
                { label: 'Uptime', value: '99.9%', color: '#a78bfa' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <div className="text-xs font-bold" style={{ color }}>{value}</div>
                  <div className="text-xs text-white/30">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { value: '99.2%', label: 'Waste Removal' },
            { value: '3x', label: 'Faster Processing' },
            { value: '60%', label: 'Energy Reduction' },
            { value: '24/7', label: 'AI Monitoring' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {value}
              </div>
              <div className="text-sm text-white/50 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={handleExplore}
      >
        <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-12 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-3 rounded-full bg-[#06b6d4] animate-pulse" />
        </motion.div>
        <ChevronDown size={16} className="text-white/30" />
      </motion.div>
    </section>
  )
}
