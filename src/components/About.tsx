import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Waves,
  Sprout,
  Droplets,
  ArrowRight,
  CheckCircle2,
  Sliders,
  AlertTriangle,
  Award,
  Sparkles,
} from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode: _darkMode }: AboutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Interactive slider position (0 to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const pillars = [
    {
      title: 'AquaClean Robot',
      subtitle: 'Floating Surface Harvester',
      desc: 'Dual-pontoon autonomous robot harvesting floating plastic waste and dense algae mats using rotating mesh conveyor technology.',
      icon: <Waves className="w-6 h-6 text-cyan-400" />,
      tag: 'Unit A',
      border: 'border-cyan-500/30',
      bg: 'from-cyan-500/10 to-transparent',
      anchor: '#aquaclean',
    },
    {
      title: 'AquaFert Unit',
      subtitle: 'Algae-to-Organic-Fertiliser',
      desc: 'Transforms harvested algae biomass through separation, dewatering, and controlled microbial composting into nutrient-rich organic soil amendments.',
      icon: <Sprout className="w-6 h-6 text-emerald-400" />,
      tag: 'Unit B',
      border: 'border-emerald-500/30',
      bg: 'from-emerald-500/10 to-transparent',
      anchor: '#aquafert',
    },
    {
      title: 'AquaPure Unit',
      subtitle: '7-Stage Water Purification',
      desc: 'Multi-barrier treatment plant utilizing screening, coagulation, sedimentation, sand & carbon filtration, and UV-C disinfection for verified safe reuse.',
      icon: <Droplets className="w-6 h-6 text-blue-400" />,
      tag: 'Unit C',
      border: 'border-blue-500/30',
      bg: 'from-blue-500/10 to-transparent',
      anchor: '#aquapure',
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0d2244]/40 to-[#0a1628]"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* LPU Innovation Competition Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-200 text-xs sm:text-sm font-medium shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Lovely Professional University Innovation Competition — 14–15 November</span>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Integrated Environmental System
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Beyond a Filter.{' '}
            <span className="gradient-text">A Complete Circular Ecosystem.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            AquaSense is an integrated environmental sustainability platform that bridges
            freshwater pond restoration, biological waste recovery, and agricultural soil
            rejuvenation into one unified technological architecture.
          </motion.p>
        </div>

        {/* Vision Statement Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-emerald-950/60 border border-cyan-500/30 backdrop-blur-md relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(6,182,212,0.5)]">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                Our Core Project Vision
              </div>
              <blockquote className="text-lg sm:text-xl font-medium text-white/95 italic">
                “To transform polluted ponds into valuable environmental resources by
                connecting water conservation, waste recovery and sustainable agriculture.”
              </blockquote>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/60">
                <span className="inline-flex items-center gap-1.5 text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Closed-Loop Circular Model
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High-Value Algae Composting
                </span>
                <span className="inline-flex items-center gap-1.5 text-blue-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Multi-Barrier Water Purification
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              className={`group p-6 rounded-2xl bg-gradient-to-b ${pillar.bg} bg-slate-900/60 border ${pillar.border} backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-white/10 text-white/80 border border-white/10">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <div className="text-xs text-cyan-400/90 font-medium mb-3">{pillar.subtitle}</div>
                <p className="text-sm text-white/70 leading-relaxed mb-6">{pillar.desc}</p>
              </div>

              <a
                href={pillar.anchor}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
              >
                <span>Explore Technical Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* ─── INTERACTIVE FEATURE 8: Before & After Pond Comparison Slider ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sliders className="w-3.5 h-3.5" />
                Interactive Pond Restoration Simulation
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Before & After: Pond Transformation
              </h3>
              <p className="text-sm text-white/60 mt-1">
                Drag the slider left and right to inspect the environmental transformation achieved by the AquaSense ecosystem.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3 shrink-0">
              <div className="text-center px-3 border-r border-white/10">
                <div className="text-xs text-white/50">Dissolved Oxygen</div>
                <div className="text-base font-bold text-emerald-400">+380%</div>
              </div>
              <div className="text-center px-3 border-r border-white/10">
                <div className="text-xs text-white/50">Turbidity Drop</div>
                <div className="text-base font-bold text-cyan-400">-92% NTU</div>
              </div>
              <div className="text-center px-3">
                <div className="text-xs text-white/50">Algae Harvest</div>
                <div className="text-base font-bold text-teal-400">100% Value</div>
              </div>
            </div>
          </div>

          {/* Slider Container */}
          <div
            ref={sliderContainerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/15"
          >
            {/* "AFTER" Layer (Full width background: Clean Restored Pond) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c4a6e] via-[#065f46] to-[#042f2e] flex flex-col justify-between p-6">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  ✓ After AquaSense Restoration
                </span>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-300">Clean Pond Ecosystem</span>
                  <div className="text-sm font-semibold text-white">DO: 7.2 mg/L • pH: 7.4 • Clear Water</div>
                </div>
              </div>

              {/* Graphical representation of clean pond */}
              <div className="relative w-full h-36 flex items-center justify-around pointer-events-none">
                {/* Floating clean water ripples */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-72 h-72 rounded-full border border-emerald-400/40 animate-ping" />
                </div>
                {/* Visual elements: Lily pads, clean fish, sunlight */}
                <div className="flex items-center gap-6 text-emerald-200/90 text-sm">
                  <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-cyan-300" />
                    <span>Active Photosynthesis & Aerobic Water</span>
                  </div>
                  <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-emerald-300" />
                    <span>Algae Valorized into Organic Soil Compost</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-emerald-200/80 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                <span>Healthy aquatic wildlife • Restored pond recreation & secondary farm irrigation</span>
                <span className="font-mono text-emerald-400 font-bold">Safe Ecological Habitat</span>
              </div>
            </div>

            {/* "BEFORE" Layer (Clipped left side: Polluted, Choked Pond) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#3f2a1d] via-[#1c2e17] to-[#1a1410] flex flex-col justify-between p-6 border-r-2 border-cyan-400"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div className="flex justify-between items-start">
                <span className="px-3 py-1.5 rounded-lg bg-red-500/30 border border-red-400/50 text-red-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  ✗ Before: Unmanaged Pond Crisis
                </span>
                <div className="text-right">
                  <span className="text-xs font-mono text-red-300">Severe Eutrophication</span>
                  <div className="text-sm font-semibold text-white">DO: 1.4 mg/L • Toxic Algal Scum</div>
                </div>
              </div>

              {/* Graphical representation of choked pond */}
              <div className="relative w-full h-36 flex items-center justify-center pointer-events-none">
                <div className="flex flex-wrap items-center justify-center gap-4 text-red-200/90 text-sm">
                  <div className="p-3 rounded-full bg-red-500/20 border border-red-400/30 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span>Hypoxia (Fish Kills & Stagnant Rot)</span>
                  </div>
                  <div className="p-3 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center gap-2">
                    <Waves className="w-5 h-5 text-amber-400" />
                    <span>Floating Plastics & Slime Mats</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-red-200/80 bg-red-950/60 p-2.5 rounded-xl border border-red-500/20">
                <span>Severe foul odors • Mosquito breeding • Water unsuited for livestock or agriculture</span>
                <span className="font-mono text-red-400 font-bold">Degraded Water Reservoir</span>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] flex items-center justify-center"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500 border-2 border-white shadow-xl flex items-center justify-center text-slate-950 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <Sliders className="w-5 h-5 rotate-90 text-white" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-white/50">
            <span>← Slide left to reveal restored pond</span>
            <span className="font-mono text-cyan-400">Position: {sliderPos.toFixed(0)}%</span>
            <span>Slide right to inspect polluted baseline →</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
