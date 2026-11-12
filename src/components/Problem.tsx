import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  AlertTriangle,
  ChevronDown,
  Leaf,
  Skull,
  Trash2,
  Waves,
  ShieldAlert,
} from 'lucide-react';

interface ProblemCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  brief: string;
  detail: string;
  consequences: string[];
  stat: string;
  statLabel: string;
  statSource: string;
  color: string;
  borderColor: string;
  accent: string;
}

const problemCards: ProblemCard[] = [
  {
    id: 'algae',
    icon: <Waves size={28} />,
    title: 'Excessive Algal Blooms & Eutrophication',
    brief: 'Agricultural fertiliser runoff and organic sewage load ponds with nitrates and phosphorus, triggering explosive cyanobacteria growth.',
    detail: 'Dense algal scums block sunlight penetration, shutting down photosynthesis in sub-surface plants. When the massive algal biomass dies, aerobic bacteria consume virtually all dissolved oxygen during decomposition. This induces severe hypoxia (dissolved oxygen dropping below 2 mg/L), precipitating catastrophic fish kills and anaerobic rotting that releases toxic hydrogen sulphide gas.',
    consequences: [
      'Rapid dissolved oxygen depletion down to hypoxic (< 2 mg/L) thresholds',
      'Mass fish suffocation and extinction of native aquatic micro-fauna',
      'Production of harmful cyanotoxins (microcystins) hazardous to livestock',
    ],
    stat: '70%+',
    statLabel: 'of peri-urban ponds suffer moderate to severe eutrophication',
    statSource: 'CPCB & UNEP Freshwater Report',
    color: 'from-emerald-500/20 to-emerald-950/20',
    borderColor: 'border-emerald-500/40',
    accent: 'text-emerald-400',
  },
  {
    id: 'plastic',
    icon: <Trash2 size={28} />,
    title: 'Floating Plastic & Polythene Debris',
    brief: 'Single-use PET bottles, polythene carry-bags, and packaging wrappers choke pond perimeters and water surfaces.',
    detail: 'Buoyant plastic waste forms impermeable blankets over pond surfaces, reducing air-water gaseous exchange. Solar UV radiation and wave action physically fragment these plastics into hazardous microplastics (< 5 mm). Microplastics are ingested by fish and waterfowl, entering the human food chain and accumulating endocrine-disrupting phthalates in local community water supplies.',
    consequences: [
      'Physical surface blanketing impedes natural wind-driven pond re-aeration',
      'Photodegradation generates bio-accumulating microplastic particles',
      'Entanglement hazards for waterfowl, amphibians, and native pond turtles',
    ],
    stat: '8M+',
    statLabel: 'tonnes of plastic enter inland water networks annually',
    statSource: 'UNEP Global Environmental Outlook',
    color: 'from-red-500/20 to-red-950/20',
    borderColor: 'border-red-500/40',
    accent: 'text-red-400',
  },
  {
    id: 'organic-rot',
    icon: <Leaf size={28} />,
    title: 'Decaying Organic Matter & Siltation',
    brief: 'Seasonal leaf-fall and rotting terrestrial vegetation form dense anaerobic benthic sludge layers.',
    detail: 'Accumulated dead leaves and unmanaged organic matter create an immense Biochemical Oxygen Demand (BOD > 45 mg/L). Rather than decomposing cleanly in aerated conditions, the debris rots anaerobically on the pond floor, depleting water table reserves, silting up water retention volumes, and releasing greenhouse gases like methane (CH4) directly into the atmosphere.',
    consequences: [
      'Severe Biochemical Oxygen Demand (BOD) spikes degrading water clarity',
      'Methane and foul thiol gas emissions from anaerobic sludge layers',
      'Accelerated pond siltation, reducing dry-season irrigation storage by up to 50%',
    ],
    stat: '50%',
    statLabel: 'loss of pond water storage capacity due to organic silt buildup',
    statSource: 'FAO Water Resource Assessment',
    color: 'from-amber-500/20 to-amber-950/20',
    borderColor: 'border-amber-500/40',
    accent: 'text-amber-400',
  },
  {
    id: 'water-scarcity',
    icon: <Skull size={28} />,
    title: 'Loss of Usable Community Water',
    brief: 'Polluted ponds become hazardous breeding grounds rather than vital community reservoirs.',
    detail: 'Ponds that historically supplied irrigation for smallholder farmers, livestock watering, and groundwater table recharge become biological liabilities. Stagnant choked waters breed disease-carrying mosquito vectors (malaria, dengue) and foster opportunistic pathogenic bacteria such as E. coli and Salmonella, forcing rural communities to rely on declining deep borewells.',
    consequences: [
      'Water rendered completely unsuited for livestock or crop irrigation',
      'Proliferation of mosquito breeding grounds and waterborne enteric vectors',
      'Severing of groundwater table recharge pathways into surrounding farmland',
    ],
    stat: '2.2B',
    statLabel: 'people globally lack access to safely managed freshwater reservoirs',
    statSource: 'WHO/UNICEF JMP Water Report',
    color: 'from-purple-500/20 to-purple-950/20',
    borderColor: 'border-purple-500/40',
    accent: 'text-purple-400',
  },
];

export default function Problem() {
  const [expandedId, setExpandedId] = useState<string | null>('algae');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="problem"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#0d1e34] to-[#0a1628] overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Ecological Threat Analysis
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            The Crisis Facing Our{' '}
            <span className="bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              Freshwater Ponds
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Freshwater ponds are biodiversity hotspots and critical agricultural buffers. Today,
            uncontrolled floating plastics, nutrient-induced algal blooms, and water pollution are
            destroying aquatic life and depriving communities of vital water resources.
          </motion.p>
        </div>

        {/* 4 Deep-Dive Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {problemCards.map((card, idx) => {
            const isExpanded = expandedId === card.id;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className={`rounded-3xl bg-slate-900/80 border ${card.borderColor} backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                      <span className={card.accent}>{card.icon}</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-black font-mono ${card.accent}`}>{card.stat}</div>
                      <div className="text-[11px] text-white/50 max-w-[180px] leading-tight">{card.statLabel}</div>
                      <div className="text-[9px] text-white/30 font-mono mt-0.5">Source: {card.statSource}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {card.title}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed mb-4">
                    {card.brief}
                  </p>

                  {/* Environmental Consequences List */}
                  <div className="space-y-1.5 mb-4">
                    {card.consequences.map((c, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/80">
                        <span className="text-red-400 font-bold shrink-0">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Deep Dive */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/10 text-xs sm:text-sm text-white/75 leading-relaxed bg-white/5 p-4 rounded-xl mt-3">
                          {card.detail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => toggleExpand(card.id)}
                  className={`mt-4 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isExpanded ? 'bg-white/10 text-white' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{isExpanded ? 'Collapse Analysis' : 'Read Scientific Impact Breakdown'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Visual Cascade Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="p-6 sm:p-8 rounded-3xl bg-red-950/30 border border-red-500/30 backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
              <div>
                <h4 className="text-base font-bold text-white">The Vicious Cycle of Pond Degradation</h4>
                <div className="text-xs text-white/60">How unaddressed pond pollution snowballs into total ecosystem collapse</div>
              </div>
            </div>
            <span className="text-xs font-mono text-red-300 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
              Unchecked Ecological Collapse
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-4 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-red-400 font-bold block mb-1">1. Nutrient Overload</span>
              <span className="text-white/70">Agricultural fertiliser runoff (nitrates & phosphates) floods stagnant ponds.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-red-400 font-bold block mb-1">2. Algae Explosion</span>
              <span className="text-white/70">Massive algal blooms blanket pond surface, starving underwater plants of solar rays.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-red-400 font-bold block mb-1">3. Dissolved O2 Depletion</span>
              <span className="text-white/70">Dying algae triggers bacterial frenzy, crashing dissolved oxygen down to zero (hypoxia).</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-red-400 font-bold block mb-1">4. Community Resource Lost</span>
              <span className="text-white/70">Total fish kill, foul gas releases, toxic cyanotoxins, and unpotable irrigation water.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
