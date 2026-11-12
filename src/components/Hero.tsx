import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Droplets,
  Sprout,
  Waves,
  Award,
  Recycle,
  ArrowRight,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode: _darkMode }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      width: (i % 3) + 1.5,
      height: (i % 3) + 1.5,
      left: `${(i * 37) % 100}%`,
      top: `${(i * 53) % 100}%`,
      duration: 3 + (i % 4),
      delay: (i * 0.2) % 3,
    }))
  );

  const handleExplore = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleSimulation = () => {
    document.querySelector('#simulation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const featurePills = [
    { icon: <Waves size={14} />, label: 'Floating Smart Robot (AquaClean)' },
    { icon: <Sprout size={14} />, label: 'Algae-to-Fertiliser (AquaFert)' },
    { icon: <Droplets size={14} />, label: '7-Stage Purification (AquaPure)' },
  ];

  const circularSteps = [
    'POLLUTION',
    'COLLECTION',
    'SEPARATION',
    'RESOURCE RECOVERY',
    'WATER TREATMENT',
    'SUSTAINABLE REUSE',
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0b2447] to-[#0a1628]" />

      {/* Radial glows */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(6,182,212,0.15) 0%, transparent 70%)',
            'radial-gradient(ellipse 90% 70% at 55% 40%, rgba(16,185,129,0.12) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(6,182,212,0.15) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Background Star/Pond Dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-200"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Competition Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                     bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-blue-500/20
                     border border-cyan-400/40 text-cyan-200 text-xs sm:text-sm font-medium shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        >
          <Award className="w-4 h-4 text-yellow-400" />
          <span>Lovely Professional University Innovation Competition — 14–15 November</span>
        </motion.div>

        {/* Brand Tagline Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-emerald-400 font-semibold uppercase mb-4"
        >
          <span>Clean Water</span>
          <span className="text-white/40">•</span>
          <span>Green Agriculture</span>
          <span className="text-white/40">•</span>
          <span>Sustainable Future</span>
        </motion.div>

        {/* Main Branding Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          AQUA<span className="gradient-text">SENSE</span>
        </motion.h1>

        {/* Project Title Definition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-white/95 max-w-4xl mx-auto mb-4 leading-relaxed"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          An Integrated Floating Pond-Cleaning, Algae-to-Fertiliser and Water-Purification System.
        </motion.p>

        {/* Prominent Motto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="inline-block px-5 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-sm sm:text-base font-medium italic mb-8 shadow-inner"
        >
          “AquaSense – Turning Pond Pollution into Environmental Opportunity.”
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {featurePills.map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl
                         bg-white/5 border border-white/10 text-white/90 text-xs sm:text-sm font-medium backdrop-blur-sm"
            >
              <span className="text-cyan-400">{pill.icon}</span>
              {pill.label}
            </div>
          ))}
        </motion.div>

        {/* Circular Economy Flow Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="max-w-4xl mx-auto mb-12 p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <Recycle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Closed-Loop Circular Economy Model</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold text-white/80">
            {circularSteps.map((step, idx) => (
              <div key={step} className="flex items-center gap-1.5 sm:gap-2">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white">
                  {step}
                </span>
                {idx < circularSteps.length - 1 && (
                  <span className="text-cyan-400 font-extrabold">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={handleExplore}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl text-base font-semibold text-white cursor-pointer
                       bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-600
                       shadow-[0_8px_30px_rgba(6,182,212,0.4)]
                       hover:shadow-[0_12px_40px_rgba(6,182,212,0.6)]
                       transition-all duration-300 w-full sm:w-auto"
          >
            Explore Complete System
          </motion.button>
          <motion.button
            onClick={handleSimulation}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl text-base font-semibold text-cyan-400 cursor-pointer
                       bg-slate-900/80 border-2 border-cyan-400/50
                       hover:border-cyan-400 hover:bg-cyan-500/10
                       transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
          >
            Launch Floating Robot Simulation
          </motion.button>
        </motion.div>

        {/* ─── VISUAL REPRESENTATION OF THE THREE INTEGRATED UNITS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                AquaSense Architecture Preview
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Three Unified Units Working in Symphony
              </h3>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/70">
              Interactive System Train
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Unit A Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-cyan-500/15 to-transparent border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300">
                    <Waves className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">UNIT A</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">AquaClean Robot</h4>
                <div className="text-xs text-cyan-300 font-medium mb-2">Floating Pond Skimmer</div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Twin HDPE pontoons, differential thrusters, front intake throat, and continuous rotating mesh conveyor.
                </p>
              </div>
              <a
                href="#aquaclean"
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Inspect Robot Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Unit B Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-500/15 to-transparent border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">UNIT B</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">AquaFert Unit</h4>
                <div className="text-xs text-emerald-300 font-medium mb-2">Algae Composting Facility</div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Dewatering screw press, C:N 25–30:1 dry straw blending, thermophilic 60°C microbial sanitization, and soil amendment.
                </p>
              </div>
              <a
                href="#aquafert"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Explore Composting Science</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Unit C Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-500/15 to-transparent border border-blue-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-blue-400 font-bold">UNIT C</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">AquaPure Unit</h4>
                <div className="text-xs text-blue-300 font-medium mb-2">7-Stage Water Treatment</div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Preliminary screening, coagulation, lamella clarifier, sand & activated carbon filtration, and UV-C germicidal disinfection.
                </p>
              </div>
              <a
                href="#aquapure"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View 7 Treatment Stages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
