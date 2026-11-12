import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Beaker,
  CheckCircle2,
  Droplets,
  Layers,
  Sparkles,
  Sprout,
  Trash2,
  Waves,
  Zap,
} from 'lucide-react';

interface ProcessNode {
  id: string;
  stepNum: string;
  name: string;
  unit: string;
  whatHappens: string;
  technologyUsed: string;
  scientificPrinciple: string;
  outputProduced: string;
  color: string;
  borderColor: string;
  accent: string;
  icon: React.ReactNode;
}

const flowNodes: ProcessNode[] = [
  {
    id: 'pond',
    stepNum: '01',
    name: 'POND ECOSYSTEM',
    unit: 'Natural Catchment',
    whatHappens: 'A freshwater pond degraded by agricultural fertiliser runoff, floating plastic waste, and thick cyanobacteria blooms requires active intervention.',
    technologyUsed: 'Environmental baseline sensor logging (Turbidity, DO, pH probes).',
    scientificPrinciple: 'Ecosystem Dynamics & Limnology of Eutrophic Waters',
    outputProduced: 'Monitored polluted water body earmarked for closed-loop remediation.',
    color: 'from-blue-600/20 to-blue-900/10',
    borderColor: 'border-blue-500/40',
    accent: 'text-blue-400',
    icon: <Waves className="w-5 h-5" />,
  },
  {
    id: 'aquaclean',
    stepNum: '02',
    name: 'AQUACLEAN HARVESTING',
    unit: 'Unit A (Floating Robot)',
    whatHappens: 'The autonomous dual-pontoon robot cruises the pond surface, using convergent guide vanes and an inclined rotating wire mesh conveyor to scoop floating algae mats, plastic bottles, and leaves.',
    technologyUsed: 'ESP32 microcontroller, differential DC propellers, ultrasonic sonar, 2.5mm mesh conveyor.',
    scientificPrinciple: "Archimedes' Buoyancy, Newton's 3rd Law of Motion, and Mechanical Sieve Filtration.",
    outputProduced: 'Harvested mixed surface catch (wet algae slurry, plastics, floating organic matter).',
    color: 'from-cyan-500/20 to-cyan-900/10',
    borderColor: 'border-cyan-500/40',
    accent: 'text-cyan-400',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'separation',
    stepNum: '03',
    name: 'WASTE SEPARATION',
    unit: 'Mechanical Sorter Bay',
    whatHappens: 'The harvested catch is transferred onshore and mechanically separated into discrete material streams: recyclable plastics, wet algae biomass, and dry organic leaves.',
    technologyUsed: 'Vibratory density sieves, magnetic iron-debris separators, and flotation settling chambers.',
    scientificPrinciple: 'Density-Differential Flotation & Size-Exclusion Screening.',
    outputProduced: 'Sorted streams: Cleaned recyclable plastics + Pure dewatered algae pulp + Organic leaves.',
    color: 'from-amber-500/20 to-amber-900/10',
    borderColor: 'border-amber-500/40',
    accent: 'text-amber-400',
    icon: <Trash2 className="w-5 h-5" />,
  },
  {
    id: 'aquafert',
    stepNum: '04',
    name: 'AQUAFERT + RECYCLING',
    unit: 'Unit B (Fertiliser Facility)',
    whatHappens: 'Plastics are baled for municipal recycling loops. Algae is blended with shredded dry straw to achieve an optimal C:N ratio (25:1 to 30:1) and aerobically composted at thermophilic 55–65°C.',
    technologyUsed: 'Continuous screw press dewaterer, forced-aeration composting windrows, ELISA toxin testing.',
    scientificPrinciple: 'Aerobic Microbial Respiration, Thermophilic Sanitization & Stoichiometric C:N Dynamics.',
    outputProduced: 'Certified pathogen-free, nutrient-rich organic soil amendment (organic N-P-K compost).',
    color: 'from-emerald-500/20 to-emerald-900/10',
    borderColor: 'border-emerald-500/40',
    accent: 'text-emerald-400',
    icon: <Sprout className="w-5 h-5" />,
  },
  {
    id: 'aquapure',
    stepNum: '05',
    name: 'AQUAPURE MULTI-STAGE',
    unit: 'Unit C (Purification Facility)',
    whatHappens: 'Remaining pond water is pumped into the multi-barrier treatment train, undergoing preliminary screening, chemical coagulation, lamella sedimentation, sand filtration, activated carbon adsorption, and UV-C germicidal disinfection.',
    technologyUsed: 'Polyaluminium chloride dosers, high-rate lamella clarifier, GAC carbon bed, 254nm UV-C reactor.',
    scientificPrinciple: "Colloidal Double-Layer Compression, Stokes' Gravitational Settling, and Pyrimidine Dimerization.",
    outputProduced: 'High-purity clarified water free of pathogenic microbes and dissolved odor compounds.',
    color: 'from-teal-500/20 to-teal-900/10',
    borderColor: 'border-teal-500/40',
    accent: 'text-teal-400',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 'testing',
    stepNum: '06',
    name: 'WATER QUALITY AUDIT',
    unit: 'Automated Telemetry Lab',
    whatHappens: 'Effluent is analyzed in real time across 7 critical parameters (pH, Turbidity, TDS, DO, E. coli, Heavy Metals, COD) against national irrigation and environmental release guidelines.',
    technologyUsed: 'Multi-parametric flow-through optical cell, nephelometric turbidimeter, automated alert logic.',
    scientificPrinciple: 'Nephelometry, Potentiometry, and Electro-Chemical Sensor Transduction.',
    outputProduced: 'Certified compliance audit telemetry certifying safety for intended reuse.',
    color: 'from-purple-500/20 to-purple-900/10',
    borderColor: 'border-purple-500/40',
    accent: 'text-purple-400',
    icon: <Beaker className="w-5 h-5" />,
  },
  {
    id: 'reuse',
    stepNum: '07',
    name: 'APPROPRIATE REUSE',
    unit: 'Sustainable Application',
    whatHappens: 'The verified clean water is delivered to surrounding farmlands for crop irrigation, pumped to replenish fish ponds, or recharged into dwindling local groundwater aquifers.',
    technologyUsed: 'Solar-powered distribution pumping manifold, low-pressure drip irrigation distribution.',
    scientificPrinciple: 'Hydro-Geological Aquifer Recharge & Soil Water Retention.',
    outputProduced: 'Restored groundwater table, boosted agricultural crop yield, and flourishing pond sanctuary.',
    color: 'from-green-500/20 to-green-900/10',
    borderColor: 'border-green-500/40',
    accent: 'text-green-400',
    icon: <Droplets className="w-5 h-5" />,
  },
];

export default function HowItWorks() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('aquaclean');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const activeNode = flowNodes.find((n) => n.id === selectedNodeId) || flowNodes[1];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#081e36] to-[#0a1628] overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Feature 4 & 9 • Complete System Flowchart
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            How AquaSense Works:{' '}
            <span className="gradient-text">Complete Interactive Process</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Click any stage in the flow sequence to inspect what happens, the engineering technology
            deployed, the governing scientific principles, and the tangible outputs produced.
          </motion.p>
        </div>

        {/* ─── CLICKABLE INTERACTIVE PROCESS FLOWCHART ─── */}
        <div className="mb-12">
          {/* Node Flow Sequence */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {flowNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border relative overflow-hidden flex flex-col justify-between ${
                  selectedNodeId === node.id
                    ? 'bg-gradient-to-b from-cyan-500/30 to-blue-600/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-102'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-white/50">{node.stepNum}</span>
                    <span className={node.accent}>{node.icon}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight mb-1">{node.name}</div>
                  <div className="text-[10px] text-white/60 truncate">{node.unit}</div>
                </div>

                {/* Animated active bottom indicator */}
                {selectedNodeId === node.id && (
                  <motion.div
                    layoutId="active-flow-node"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── ACTIVE NODE DEEP-DIVE INSPECTOR CARD ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-cyan-400">
                  {activeNode.icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    Flow Node {activeNode.stepNum} • {activeNode.unit}
                  </span>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {activeNode.name}
                  </h3>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                Connected Closed-Loop
              </span>
            </div>

            {/* 4 Deep-Dive Grid Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. What Happens at This Stage */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1. What Happens at This Stage</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {activeNode.whatHappens}
                </p>
              </div>

              {/* 2. Which Technology is Used */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>2. Which Technology is Used</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {activeNode.technologyUsed}
                </p>
              </div>

              {/* 3. Which Scientific Principle is Involved */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>3. Governing Scientific Principle</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {activeNode.scientificPrinciple}
                </p>
              </div>

              {/* 4. What Output is Produced */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>4. What Output is Produced</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-semibold text-emerald-300">
                  {activeNode.outputProduced}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
